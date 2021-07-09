const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", function (req, res, next) {
  res.render("index");
});

/* GET task creation function */
router.get("/create-task", function (req, res, next) {
  res.render("create-task");
});

module.exports = router;
