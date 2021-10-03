const {
  Task,
  Attachment,
  Task_has_tags,
  Task_has_actions,
} = require("../database/models");

exports.createTask = async ({ newTask, participantIds, tags, actions }) => {
  const taskCreated = await Task.create(newTask);
  await taskCreated.setUserParticipants(participantIds);
  await taskCreated.setTags(tags);
  await taskCreated.setActions(actions);

  return taskCreated.dataValues;
};

exports.taskToTags = async ({ taskId, taskTagId }) => {
  await Task_has_tags.create({
    task_id: taskId,
    task_tag_id: taskTagId,
  });
};

exports.taskToAction = async ({ taskId, taskActionId }) => {
  await Task_has_actions.create({
    task_id: taskId,
    task_action_id: taskActionId,
  });
};

exports.getAllTasks = () => Task.findAll();

exports.getTaskById = async (id) => {
  const taskGotByID = await Task.findByPk(id);

  return taskGotByID;
};

exports.getTagsTask = async (tagsId) => {
  const tagTask = await Task.findByPk(tagsId);
  const tagsList = await tagTask.getTags();

  return tagsList.dataValues;
};

exports.getActionTask = async (actionId) => {
  const actionTask = await Task.findByPk(actionId);
  const actionList = await actionTask.getActions();

  return actionList.dataValues;
};

exports.addAttachments = async (attachments) => {
  await Attachment.bulkCreate(attachments);
};

exports.destroy = (id) =>
  Task.destroy({
    where: {
      id,
    },
  });
