const UserModel = require("../models/User");

const UserController = {
  createUser: (
    nome,
    nickname,
    email,
    confirmEmail,
    password,
    confirmPassword
  ) => {
    return UserModel.createUser({
      nome,
      nickname,
      email,
      confirmEmail,
      password,
      confirmPassword,
    });
  },
};

module.exports = UserController;
