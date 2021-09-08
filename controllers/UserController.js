const UserModel = require("../models/User");

exports.createUser = (
  first_name,
  last_name,
  email,
  password,
  position,
  company
) =>
  UserModel.createUser(
    first_name,
    last_name,
    email,
    password,
    position,
    company
  );
    