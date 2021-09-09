const { check } = require("express-validator");

exports.nameValidator = check("first_name")
  .notEmpty()
  .isAlpha()
  .withMessage("Name is required");
exports.LastNameValidator = check("last_name")
  .notEmpty()
  .isAlpha()
  .withMessage("Last Name is required");
exports.emailValidator = check("email")
  .notEmpty()
  .isEmail({
    require_display_name: true,
    ignore_max_length: true,
  })
  .withMessage("Valid email is required");
exports.passwordValidator = check("password")
  .notEmpty()
  .isStrongPassword()
  .withMessage("Password is required");
exports.positionValidator = check("position")
  .notEmpty()
  .withMessage("Position is required");
exports.companyValidator = check("company")
  .notEmpty()
  .withMessage("Company is required");
