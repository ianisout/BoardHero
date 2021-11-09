// const { check, body } = require("express-validator");
// const UserModel = require("../models/User");

// const validator = [
//   check("first_name").notEmpty().withMessage("Name must be filled"),
//   check("last_name").notEmpty().withMessage("Last Name must be filled"),
//   body("email")
//     .isEmail()
//     .withMessage("Email must be valid")
//     .bail()
//     .custom((value) => {
//       return UserModel.getUserByEmail(value).then((user) => {
//         if (user) {
//           return Promise.reject("E-mail already in use");
//         }
//       });
//     }),
//   body("confirmEmail").custom((value, { req }) => {
//     if (value !== req.body.email) {
//       throw new Error("E-mail confirmation does not match");
//     }
//     return true;
//   }),
//   check("password")
//     .isStrongPassword()
//     .withMessage(
//       "Password must contain a min 8 characters. At least a special characters , Upper and Lower case"
//     )
//     .bail(),
//   body("confirmPassword").custom((value, { req }) => {
//     if (value !== req.body.password) {
//       throw new Error("Password confirmation does not match");
//     }
//     return true;
//   }),
// ];

// module.exports = validator;
