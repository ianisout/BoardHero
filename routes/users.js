const express = require("express");
const router = express.Router();

const bcryptjs = require("bcryptjs");
const { request } = require("express");
const UserController = require("../controllers/UserController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* GET signup page */
router.get("/signup", async function (req, res, next) {
  const { nome, nickname, email, confirmEmail, password, confirmPassword } =
    req.body;

  await UserController.createUser(
    nome,
    nickname,
    email,
    confirmEmail,
    password,
    confirmPassword
  );

  res.status(201).redirect("signup");
});

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
