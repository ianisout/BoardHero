const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const bcryptjs = require("bcryptjs");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* GET signup page */
router.get("/signup", function (request, response, next) {
  return response.render("signup");
});

router.post("/signup", async function (request, response, next) {
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

  const userCreated = await UserController.createUser({
    first_name,
    last_name,
    email,
    confirmEmail,
    password,
    confirmPassword,
    position,
    company
  });

  request.session.user = userCreated;
  console.log(request.session);

  return response.status(201).redirect("/homepage");
});

/* GET login page */
router.get("/login", function (req, res, next) {
  res.render("login");
});

/* POST login form */
router.post("/login", async function(req, res, next) {
  const { email, password } = req.body;

  const userLogged = await UserController.loginUser({ email, password });

  req.session.user = userLogged;
  console.log(req.session);

  return res.status(201).redirect("/homepage");
});

/* GET logout page */
router.get("/logout", function (req, res, next) {
  delete req.session.user;
  res.status(201).redirect("/");
});

/* GET forgot-password page */
router.get("/forgot-password", function (req, res, next) {
  res.render("forgot-password");
});

/* GET user settings page */
router.get("/settings", function (req, res, next) {
  const { session } = req;
  if (!session.user) {
    res.status(201).redirect("/user/login");
  }
  res.render("settings", { user: session.user});
});

module.exports = router;
