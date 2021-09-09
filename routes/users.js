const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const bcryptjs = require("bcryptjs");
const validator = require("../middlewares/signupValidation");
const {
  nameValidator,
  LastNameValidator,
  emailValidator,
  passwordValidator,
  positionValidator,
  companyValidator,
} = validator;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* GET signup page */
router.get("/signup", function (request, response, next) {
  return response.render("signup");
});

const userValidation = [
  nameValidator,
  LastNameValidator,
  emailValidator,
  passwordValidator,
  positionValidator,
  companyValidator,
];

router.post(
  "/signup",
  userValidation,
  async function (request, response, next) {
    const {
      first_name,
      last_name,
      email,
      confirmEmail,
      password,
      confirmPassword,
      position,
      company,
    } = request.body;

    const userCreated = await UserController.createUser(
      first_name,
      last_name,
      email,
      confirmEmail,
      password,
      confirmPassword,
      position,
      company
    );

    request.session.user = userCreated;
    console.log(request.session);

    return response.status(201).redirect("/homepage");
  }
);

/* GET login page */
router.get("/login", function (req, res, next) {
  res.render("login");
});

/* GET forgot-password page */
router.get("/forgot-password", function (req, res, next) {
  res.render("forgot-password");
});

/* GET user settings page */
router.get("/settings", function (req, res, next) {
  res.render("settings");
});

module.exports = router;
