const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", function (req, res, next) {
  res.render("index");
});

/* GET home page */
router.get("/index", function (req, res, next) {
  res.render("index");
});

/* GET task creation function */
router.get("/create-task", function (req, res, next) {
  res.render("create-task");
});

/* GET settings function */
router.get("/settings", function (req, res, next) {
  res.render("settings");
});

/* GET character or signup options page  */
router.get("/char-login", function (req, res, next) {
  res.render("char-login");
});

/* GET character creation page */
router.get("/character-creation", function (req, res, next) {
  res.render("character-creation");
});

/* GET signup page */
router.get("/signup", function (req, res, next) {
  res.render("signup");
});

/* GET login page */
router.get("/login", function (req, res, next) {
  res.render("login");
});

/* GET inventory/store page */
router.get("/inventory", function (req, res, next) {
  res.render("inventory-store");
});

/* GET reference page for sidebar and navbar components (TEST) */
router.get("/homepage", function (req, res, next) {
  res.render("homepage");
});

router.get("/homepagecopy", function (req, res, next) {
  res.render("homepagecopy");
});


router.get("/settingscopy", function (req, res, next) {
  res.render("settingscopy");
});

/* GET dashboard page */
router.get("/dashboard", function (req, res, next) {
  res.render("dashboard");
});

module.exports = router;
