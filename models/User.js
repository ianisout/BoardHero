const { User } = require("../database/models");

exports.createUser = async (newUser) => {
  const userCreated = await User.create(newUser);

  return userCreated.dataValues;
};

exports.getUserByEmail = async (email) => {
  const userCreated = await User.findOne({ where: { email: email }});

  return userCreated.dataValues;
};