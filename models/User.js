const { User } = require("../database/models");

exports.createUser = (
  first_name,
  last_name,
  email,
  password,
  position,
  company
) =>
  User.create(
    first_name,
    last_name,
    email,
    password,
    position,
    company
  );
