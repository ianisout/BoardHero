const { request } = require("express");
const { check } = require("express-validator");
const { validationResult } = require("express-validator");


exports.nameValidator = check("first_name")
  .isLength({ min: 4 })
  .trim()
  .notEmpty()
  .withMessage("Name is required");
exports.lasNameValidator = check("last_name")
  .isLength({ min: 4 })
  .trim()
  .notEmpty()
  .withMessage("Last name is required");
exports.emailValidator = check("email")
  .isEmail()
  .notEmpty()
  .withMessage("A valid email is required");
exports.passwordValidator = check("password").isStrongPassword();

module.exports = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
