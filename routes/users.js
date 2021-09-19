const express = require("express");
const router = express.Router();

const verifyLoggedUser = require("../middlewares/VerifyLoggedUser");
const verifyNotLoggedUser = require("../middlewares/VerifyNotLoggedUser");

const UserController = require("../controllers/UserController");
const WorkspaceController = require("../controllers/WorkspaceController");

const { log } = console;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* GET signup page */
router.get("/signup", verifyNotLoggedUser, function (request, response, next) {
  let test = request.cookies;
  console.log(test)
  response.render("signup");
});

/* POST signup form */
router.post("/signup", async function (request, response, next) {
  try {
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
      log(request.session);

      response.status(201).redirect("/homepage");
    } else {
      // Send the error message to the view
    }
  } catch (error) {
    console.error(error);
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
    } else {
      // Send the error message to the view
    }
  } catch (error) {
    console.error(error);
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