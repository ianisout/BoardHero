const { User } = require("../database/models");

exports.createUser = async (newUser) => {
  const userCreated = await User.create(newUser);

  return userCreated.dataValues;
};
