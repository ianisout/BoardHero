const express = require("express");
const router = express.Router();

const fs = require("fs");
const os = require("os");
const multer = require("multer");

// get path of temp directory
// example: 'C:/Users/natha/AppData/Local/Temp'
const tempDir = os.tmpdir(); 
const upload = multer({ dest: tempDir }); 

/* GET home page */
router.get("/", function (req, res, next) {
  if (req.session.user) {
    res.status(201).redirect("/homepage");
  }
  res.render("index");
});

/* GET home page */
router.get("/index", function (req, res, next) {
  if (req.session.user) {
    res.status(201).redirect("/homepage");
  }
  res.render("index");
});

/* GET character or signup options page  */
router.get("/char-login", function (req, res, next) {
  res.render("char-login");
});

/* GET character creation page */
router.get("/character-creation", function (req, res, next) {
  res.render("character-creation");
});

/* GET reference page for sidebar and navbar components (TEST) */
router.get("/homepage", function (req, res, next) {
  const { session } = req;
  if (!session.user) {
    res.status(201).redirect("/user/login");
  }
  res.render("homepage", { user: session.user});
});

/* GET dashboard page */
router.get("/dashboard", function (req, res, next) {
  const { session } = req;
  if (!session.user) {
    res.status(201).redirect("/user/login");
  }
  res.render("dashboard", { user: session.user});
});

/* GET task creation function */
router.get("/create-task", function (req, res, next) {
  const { session } = req;
  if (!session.user) {
    res.status(201).redirect("/user/login");
  }
  res.render("create-task", { user: session.user});
});

/* POST task creation form */
router.post("/create-task", upload.array('task-files'), function (req, res, next) {
  /* 
    Handle form data and files...
  
  */
  res.redirect("/dashboard");
});

/* GET view-task-details page */
router.get("/task-details", function (req, res, next) {
  const { session } = req;
  if (!session.user) {
    res.status(201).redirect("/user/login");
  }
  res.render("view-task-details", { user: session.user});
});

/* GET inventory/store page */
router.get("/inventory", function (req, res, next) {
  const { session } = req;
  if (!session.user) {
    res.status(201).redirect("/user/login");
  }
  res.render("inventory-store", { user: session.user});
});

module.exports = router;