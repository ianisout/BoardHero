const UserModel = require("../models/User");

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
  UserModel.createUser(
    first_name,
    last_name,
    email,
    confirmEmail,
    password,
    confirmPassword,
    position,
    company
  );
