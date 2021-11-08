const express = require("express");
const router = express.Router();

const verifyLoggedUser = require("../middlewares/VerifyLoggedUser");
const verifyNotLoggedUser = require("../middlewares/VerifyNotLoggedUser");
const WorkspaceController = require("../controllers/WorkspaceController");
const UserController = require("../controllers/UserController");

/* GET admin tools page */
router.get("/admintools", verifyLoggedUser, async function (req, res, next) {
  const userSession = req.session.user;
  const workspace_id = userSession.activeWorkspace.id;
  const workspaceUsers = await WorkspaceController.getWorkspaceUsers(
    workspace_id
  );
  const workspaces = await WorkspaceController.getWorkspaces(userSession.id);
  req.session.users = await WorkspaceController.findWorkspaceUsersCharacters(workspace_id);
  const usersCharacters = req.session.users;

  let activeWorkspace;
  workspaces.map((workspace) =>
    workspace.workspaceId === userSession.activeWorkspace.id
      ? (activeWorkspace = workspace)
      : null
  );

  res.render("admintools", {
    user: userSession,
    workspaces,
    workspaceUsers,
    activeWorkspace,
    usersCharacters
  });
});

/* PATCH -> change workspace */
router.put("/admintools", async function (req, res, next) {
  const userSession = req.session.user;
  const { workspaceChosen } = req.body;

  const changedWorkspace = await WorkspaceController.findWorkspaceByUser(
    userSession.id,
    workspaceChosen
  );

  userSession.activeWorkspace = {
    id: changedWorkspace.workspace_id,
    isAdmin: changedWorkspace.is_admin,
    workspaceName: changedWorkspace.workspaceName,
  };

  res.redirect("/homepage");
});


/* PATCH -> insert user into active workspace */
router.patch("/admintools", async function (req, res, next) {
  const userSession = req.session.user;
  const workspace_id = userSession.activeWorkspace.id;
  const { newUser, isAdmin } = req.body;

  const existingUser = await UserController.getUserIfExists(newUser);
  if (!existingUser) res.json({ emailExists: false });

  await WorkspaceController.updateWorkspaceUsers({
    email: existingUser.dataValues.email,
    workspace_id: workspace_id,
    isAdmin,
  });

  res.redirect("admintools");
});

/* POST create workspace */
router.post("/admintools", async function (req, res) {
  const userSession = req.session.user;
  const { workspaceName, newUser, isAdmin } = req.body;

  const workspaceCreated = await WorkspaceController.createWorkspace({
    workspace: {
      name: workspaceName,
    },
    userId: userSession.id,
    isAdmin: true,
  });

  const existingUser = await UserController.getUserIfExists(newUser);
  if (!existingUser) res.json({ emailExists: false });

  await WorkspaceController.updateWorkspaceUsers({
    email: existingUser.dataValues.email,
    workspace_id: workspaceCreated.id,
    isAdmin,
  });

  res.redirect("admintools");
});


module.exports = router;
