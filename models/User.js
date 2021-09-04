const { User } = require("../database/models");

exports.createUser = (
  first_name,
  last_name,
  email,
  confirmEmail,
  password,
  confirmPassword,
  position,
  company
) =>
  User.create(
    first_name,
    last_name,
    email,
    confirmEmail,
    password,
    confirmPassword,
    position,
    company
  );
