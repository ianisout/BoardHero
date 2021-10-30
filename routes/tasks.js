const express = require("express");
const router = express.Router();

const verifyLoggedUser = require("../middlewares/VerifyLoggedUser");
const TaskController = require("../controllers/TaskController");
const WorkspaceController = require("../controllers/WorkspaceController");
const UserController = require('../controllers/UserController');

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
  const { user } = req.session;
  res.render("task-create", { user });
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

  const participantIds = !participants
    ? undefined
    : JSON.parse(participants).map((participant) => Number(participant.value));

  const tagValues = !tags
    ? undefined
    : JSON.parse(tags).map((tag) => tag.value);

  TaskController.createTask({
    user_id,
    workspace_id,
    task_name,
    start_date,
    end_date,
    description,
    participantIds,
    actions,
    tagValues,
    filesInfo,
  });

  res.redirect("/homepage");
});

/* GET task details page */
router.get("/details/:id", verifyLoggedUser, async function (req, res, next) {
  const { user } = req.session;
  const { id } = req.params;
  const taskDetailsGotbyId = await TaskController.getTaskById(id);
  const taskComments = await TaskController.findAllComments(id);

  res.render("task-details", { user, taskDetails: taskDetailsGotbyId, taskComments });
});

router.post("/details/:id", async function (req, res) {
  const { id } = req.params;
  const { user } = req.session;
  const { text } = req.body;
  const taskDetailsGotbyId = await TaskController.getTaskById(id);
  const userId = user.id;

  await TaskController.addComment(userId, id, text);

  const taskComments = await TaskController.findAllComments(id);

  res.render("task-details", { user, taskDetails: taskDetailsGotbyId, taskComments });
});

/* DELETE task */
router.delete("/details/:id", async function (req, res) {
  const { id } = req.params;
  await TaskController.deleteTask(id);

  return res.redirect("/homepage");
});

router.patch("/details/:id&:task_status_id", async function (req, res) {
  const { id, task_status_id } = req.params;
  console.log(id)
  console.log(task_status_id)
  
  await TaskController.updateStatus(id, task_status_id);

  return res.redirect("/homepage");
});

/* GET workspace users - Tagify participants */
router.get("/users-list", async function (req, res, next) {
  const userSession = req.session.user;
  const workspace_id = userSession.activeWorkspace.id;
  const workspaceUsers = await WorkspaceController.getWorkspaceUsers(
    workspace_id
  );
  res.json(workspaceUsers);
});

router.patch("/participants/:taskId", async function (req, res, next) {
  const { taskId } = req.params;
  const { participants } = req.body;

  const participantIds = !participants
    ? undefined
    : JSON.parse(participants).map((participant) => Number(participant.value));

  await TaskController.setParticipants({ taskId, participantIds });

  log(taskId, participants);

  res.status(200).end();
});

router.get("/tags-list", async function (req, res) {
  const tags = await TaskController.getAllTaskTags();
  res.json(tags);
});

router.patch("/tags/:taskId", async function (req, res, next) {
  const { taskId } = req.params;
  const { tags } = req.body;

  const tagValues = !tags
    ? undefined
    : JSON.parse(tags).map((tag) => tag.value);
  
  await TaskController.setTags({ taskId, tagValues });

  res.status(200).end();
});

module.exports = router;
