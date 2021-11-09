const { User, Character, Element, Characters_has_element } = require("../database/models");

exports.createUser = async (newUser) => {
  const userCreated = await User.create(newUser);

  return userCreated.dataValues;
};

exports.getUserByEmail = async (email) => {
  const loggedUser = await User.findOne({ where: { email: email }, include: ["workspaces"] });

  return loggedUser ? loggedUser.dataValues : null;
};

exports.findAllUsers = async () => await User.findAll();

exports.findByPk = async (id) => await User.findByPk(id);

exports.findCharacterByUser = async (id) => {
  const character = await Character.findOne({ where: { user_id: id }, attributes: ['id'] });
  const character_id = character.dataValues.id;
  const elements = await Characters_has_element.findAll({ where: { character_id }});
  const userElements = []
  
  for (let i = 0; i < elements.length; i ++) {
    if(elements[i].dataValues.is_equipped) {
      const elementImagePath = await Element.findByPk(elements[i].dataValues.element_id);
      userElements.push(elementImagePath.dataValues.image_path)
    }
  }

  return userElements;
}

exports.getUserIfExists = async email => {
  const userFound = await User.findOne({
    where: {
      email
    }});

  return userFound;
}