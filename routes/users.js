const express = require("express");
const router = express.Router();
const { User } = require("../database/models");
const UserController = require("../controllers/UserController");

const bcryptjs = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET signup page */
router.get("/signup", function(request, response, next) {
  return response.render("signup");
});

router.post("/signup", async function(request, response, next) {
  const {
    first_name,
    last_name,
    email,
    password,
    position,
    company,
  } = request.body;
  await UserController.createUser(
    first_name,
    last_name,
    email,
    password,
    position,
    company
  );
  return response.status(201).redirect("/homepage");
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