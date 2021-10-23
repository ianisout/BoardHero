const express = require("express");
const router = express.Router();

const verifyLoggedUser = require("../middlewares/VerifyLoggedUser");
const verifyNotLoggedUser = require("../middlewares/VerifyNotLoggedUser");
const WorkspaceController = require("../controllers/WorkspaceController");
const UserController = require('../controllers/UserController');


router.get("/create", verifyLoggedUser, async function (req, res, next) {
  const userSession = req.session.user;
  const workspace_id = userSession.activeWorkspace.id;
  const workspaceUsers = await WorkspaceController.getWorkspaceUsers(
    workspace_id
  );
  const workspaces = await WorkspaceController.getWorkspaces(userSession.id);

  res.render("workspace-creation", { user: userSession, workspaceUsers, workspaces });
});

router.post("/create", async function (req, res, next) {
  const userSession = req.session.user;
  const { workspaceName, newUser, isAdmin } = req.body;
  const workspace_id = userSession.activeWorkspace.id;
  const workspaceUsers = await WorkspaceController.getWorkspaceUsers(
    workspace_id
  );
  const workspaces = await WorkspaceController.getWorkspaces(userSession.id);
  const existingUser = await UserController.getUserIfExists(newUser);

  const workspaceCreated = await WorkspaceController.createWorkspace({
    workspace: {
      name: workspaceName,
    },
    userId: userSession.id,
    isAdmin: true,
  });

  if (!existingUser) res.json({ emailExists: false });

  await WorkspaceController.updateWorkspaceUsers(existingUser.dataValues.email, workspaceCreated.id, isAdmin);

  res.render("admintools", { user: userSession, workspaces, workspaceUsers });
});

router.get("/admintools", verifyLoggedUser, async function (req, res, next) {
  const userSession = req.session.user;
  const workspace_id = userSession.activeWorkspace.id;
  const workspaceUsers = await WorkspaceController.getWorkspaceUsers(
    workspace_id
  );
  const workspaces = await WorkspaceController.getWorkspaces(userSession.id);

  res.render("admintools", { user: userSession, workspaceUsers, workspaces });
});

router.post("/admintools", async function (req, res, next) {
  const userSession = req.session.user;
  const { newUser, isAdmin } = req.body;
  const workspace_id = userSession.activeWorkspace.id;
  const workspaceUsers = await WorkspaceController.getWorkspaceUsers(
    workspace_id
  );
  const workspaces = await WorkspaceController.getWorkspaces(userSession.id);
  const existingUser = await UserController.getUserIfExists(newUser)

  if (!existingUser) res.json({ emailExists: false });

  await WorkspaceController.updateWorkspaceUsers(existingUser.dataValues.email, workspace_id, isAdmin);
  
  res.render("admintools", { user: userSession, workspaces, workspaceUsers });
});

module.exports = router;