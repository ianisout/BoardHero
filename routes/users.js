const express = require("express");
const router = express.Router();

const verifyLoggedUser = require("../middlewares/VerifyLoggedUser");
const verifyNotLoggedUser = require("../middlewares/VerifyNotLoggedUser");

const { validationResult } = require("express-validator");
const signupValidations = require("../middlewares/signupValidation");
const validationErrorMessage = require("../middlewares/validationMessage");

const UserController = require("../controllers/UserController");
const WorkspaceController = require("../controllers/WorkspaceController");

const { log } = console;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* GET signup page */
router.get("/signup", verifyNotLoggedUser, function (request, response, next) {
  const { CHARACTER_SET } = request.cookies;
  response.cookie("CHARACTER_SET", CHARACTER_SET, { maxAge: 60000 });
  response.render("signup");
});

/* POST signup form */
router.post("/signup", /*signupValidations, validationErrorMessage,*/ async function (request, response, next) {
  console.log(validationErrorMessage)
  try {
    const { CHARACTER_SET } = request.cookies;
    const characterChoices = (CHARACTER_SET !== "undefined") ? JSON.parse(CHARACTER_SET) : undefined;

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
      company,
      characterChoices
    });

    if (userCreated) {
      const isAdmin = true;
      const workspaceName = `${first_name}'s Workspace`;

      const workspaceCreated = await WorkspaceController.createWorkspace({
        workspace: {
          name: workspaceName,
        },
        userId: userCreated.id,
        isAdmin: isAdmin,
      });

      const userSession = {
        ...userCreated,
        workspaces: [workspaceCreated],
        activeWorkspace: {
          id: workspaceCreated.id,
          isAdmin: isAdmin,
        },
      };

      request.session.user = userSession;

      response.clearCookie("CHARACTER_SET");
      response.status(201).redirect("/homepage");
    }
  } catch (error) {
    console.log(error);
    return response.render('signup');
  }
});

/* GET login page */
router.get("/login", verifyNotLoggedUser, function (req, res, next) {
  res.render("login");
});

/* POST login form */
router.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;

    const userLogged = await UserController.loginUser({ email, password });

    if (userLogged) {
      const defaultWorkspace = userLogged.workspaces[0];

      const userSession = {
        ...userLogged,
        activeWorkspace: {
          id: defaultWorkspace.id,
          isAdmin: true,
        },
      };

      req.session.user = userSession;
      log(req.session);

      res.status(201).redirect("/homepage");
    }
  } catch (error) {
    console.log(error);
    return res.render('login', { error: error.message });
  }
});

/* GET logout */
router.get("/logout", function (req, res, next) {
  delete req.session.user;
  res.status(201).redirect("/");
});

/* GET forgot-password page */
router.get("/forgot-password", function (req, res, next) {
  res.render("forgot-password");
});

/* GET user settings page */
router.get("/settings", verifyLoggedUser, function (req, res, next) {
  res.render("settings", { user: req.session.user });
});

module.exports = router;
