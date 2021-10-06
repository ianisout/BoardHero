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

exports.getAllTasks = (workspaceId) => Task.findAll({
  where: {
    workspace_id: workspaceId,
  }
});

exports.getTaskById = async (id) => {
  const taskGotByID = await Task.findByPk(id, {
    include: ["userParticipants", "userAttachments"],
  });

  return taskGotByID ? taskGotByID.dataValues : null;
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
