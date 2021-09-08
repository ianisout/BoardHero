const UserModel = require("../models/User");
const bcryptjs = require("bcryptjs");

exports.createUser = (
  first_name,
  last_name,
  email,
  confirmEmail,
  password,
  confirmPassword,
  position,
  company
) => {
  if (email !== confirmEmail) {
    throw new Error("Email do not match");
  }
  if (password !== confirmPassword) {
    throw new Error("Password do not match");
  }

  const passwordHashed = bcryptjs.hashSync(password);

  const newUser = {
    first_name,
    last_name,
    email,
    password,
    position,
    company,
  };
  return UserModel.createUser(newUser);
};
