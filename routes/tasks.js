const express = require("express");
const router = express.Router();

const verifyLoggedUser = require("../middlewares/VerifyLoggedUser");

const TaskController = require("../controllers/TaskController");
const WorkspaceController = require("../controllers/WorkspaceController");

const fs = require("fs");
const os = require("os");
const multer = require("multer");

// get path of temp directory
// example: 'C:/Users/natha/AppData/Local/Temp'
const tempDir = os.tmpdir();
const upload = multer({ dest: tempDir });

const { log } = console;

/* GET task creation page */
router.get("/create", verifyLoggedUser, function (req, res, next) {
  res.render("task-create", { user: req.session.user });
});

/* POST task creation form */
router.post("/create", upload.array("task_files"), function (req, res, next) {
  const filesInfo = req.files;
  const userSession = req.session.user;
  const user_id = userSession.id;
  const workspace_id = userSession.activeWorkspace.id;

  log(req.body);
  log(req.files);

  const {
    task_name,
    start_date,
    end_date,
    description,
    participants,
    tags,
    flag_need_to_do,
    flag_pending_tests,
    flag_pending_approval,
    flag_approved,
  } = req.body;

  const actions = {
    flag_need_to_do,
    flag_pending_tests,
    flag_pending_approval,
    flag_approved,
  };

  TaskController.createTask({
    user_id,
    workspace_id,
    task_name,
    start_date,
    end_date,
    description,
    participants,
    actions,
    tags,
    filesInfo,
  });

  res.redirect("/dashboard");
});

/* GET task details page */
router.get("/details", verifyLoggedUser, function (req, res, next) {
  res.render("task-details", { user: req.session.user });
});

router.get("/users-list", async function (req, res, next) {
  const userSession = req.session.user;
  const workspace_id = userSession.activeWorkspace.id;
  const workspaceUsers = await WorkspaceController.getWorkspaceUsers(workspace_id);
  
  res.send(JSON.stringify(workspaceUsers));
});

module.exports = router;
