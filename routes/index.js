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


/* GET character or signup options page  */
router.get("/char-login", function (req, res, next) {
  res.render("char-login");
});

/* GET character creation page */
router.get("/character-creation", function (req, res, next) {
  res.render("character-creation");
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


router.get("/settings", function (req, res, next) {
  res.render("settings");
});

/* GET dashboard page */
router.get("/dashboard", function (req, res, next) {
  res.render("dashboard");
});

/* GET view-task-details page */
router.get("/task-details", function (req, res, next) {
  res.render("view-task-details");
});

module.exports = router;
