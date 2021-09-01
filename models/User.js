const { User } = require("../database/models");

const UserModel = {
  createUser: ({
    nome,
    nickname,
    email,
    confirmEmail,
    password,
    confirmPassword,
  }) =>
    User.create({
      nome,
      nickname,
      email,
      confirmEmail,
      password,
      confirmPassword,
    }),
};

module.exports = UserModel;
