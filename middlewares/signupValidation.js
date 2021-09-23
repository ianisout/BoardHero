const { check, body, validationResult } = require("express-validator");
const UserModel = require("../models/User");


  exports.firstName = check("first_name").notEmpty().withMessage("Name must be filled");
  exports.lastName = check("last_name").notEmpty().withMessage("Last Name must be filled");
  exports.email = body("email")
    .isEmail()
    .withMessage("Email must be valid")
    .bail()
    .custom((value) => {
      return UserModel.getUserByEmail(value).then((user) => {
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      });
    });
  exports.confirmEmail = body("confirmEmail").custom((value, { req }) => {
    if (value !== req.body.email) {
      throw new Erro("E-mail confirmation does not match");
    }
    return true;
  });
  exports.password = check("password")
    .isStrongPassword()
    .withMessage(
      "Password must contain a min 8 characters. At least a special characters , Upper and Lower case"
    )
    .bail();
  exports.confirmPassword = body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Erro("Password confirmation does not match");
    }
    return true;
  })

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.errors
      .map((item) => `${item.param}: ${item.msg}`)
      .join("\n");
    throw new Error(errorMessage);
}
next();
};
