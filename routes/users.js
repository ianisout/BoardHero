const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET signup page */
router.get("/signup", function (req, res, next) {
  res.render("signup");
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
