const { User } = require("../database/models");

exports.createUser = async (newUser) => await User.create(newUser);
  