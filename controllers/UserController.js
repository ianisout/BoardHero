const UserModel = require("../models/User");
const ElementModel = require("../models/Element");
const CharacterModel = require("../models/Character");
const bcryptjs = require("bcryptjs");

exports.createUser = async ({
  first_name,
  last_name,
  email,
  confirmEmail,
  password,
  confirmPassword,
  position,
  company,
  characterChoices
}) => {
  try {
    if (email !== confirmEmail) {
      throw new Error("Email do not match");
    }
    if (password !== confirmPassword) {
      throw new Error("Password do not match");
    }

    const isExistingUser = await UserModel.getUserByEmail(email);

    if (isExistingUser) {
      throw new Error("Invalid entry");
    }

    const passwordHashed = bcryptjs.hashSync(password);
  
    const newUser = {
      first_name,
      last_name,
      email,
      password: passwordHashed,
      position,
      company,
    };

    const { password: notUsedPassword, ...userCreated } = await UserModel.createUser(newUser);

    const characterCreated = await CharacterModel.createCharacter(userCreated.id);

    await ElementModel.setCharacterElements(characterChoices, characterCreated.id);

    return userCreated;
  } 
  catch (error) {
    throw (error);
  }
};

exports.loginUser = async ({ email, password }) => {
  try {
    const existingUser = await UserModel.getUserByEmail(email);

    if (!existingUser) {
      throw new Error("Access denied: invalid email or password");
    }

    if (!bcryptjs.compareSync(password, existingUser.password)) {
      throw new Error("Access denied: invalid email or password");
    }

    const { password: notUsedPassword, workspaces, ...loggedUser } = existingUser;

    const formattedWorkspaces = workspaces.map(workspace => workspace.dataValues);

    const userPlusWorkspaces = { ...loggedUser, workspaces: formattedWorkspaces };
    console.log(userPlusWorkspaces);

    return userPlusWorkspaces;
  } 
  catch (error) {
    throw (error);
  }
};

exports.getUserIfExists = email => UserModel.getUserIfExists(email);