const UserModel = require("../models/User");
const bcryptjs = require("bcryptjs");

exports.createUser = async ({
  first_name,
  last_name,
  email,
  confirmEmail,
  password,
  confirmPassword,
  position,
  company
}) => {
  try {
    if (email !== confirmEmail) {
      throw new Error("Email do not match");
    }
    if (password !== confirmPassword) {
      throw new Error("Password do not match");
    }

    console.log(password);

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
    console.log(userCreated);
  
    return userCreated;
  } 
  catch (error) {
    console.error(error);
  }
};

exports.loginUser = async ( { email, password } ) => {
  try {
    const existingUser = await UserModel.getUserByEmail(email);

    if (!existingUser) {
      throw new Error("Access denied: invalid email or password");
    }

    if (!bcryptjs.compareSync(password, existingUser.password)) {
      throw new Error("Access denied: invalid email or password");
    }

    const { password: notUsedPassword, ...loggedUser } = existingUser;
    console.log(loggedUser);

    return loggedUser;
  } 
  catch (error) {
    console.error(error);
  }
};