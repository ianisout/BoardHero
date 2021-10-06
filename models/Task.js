const { Task, Attachment } = require("../database/models");

exports.createTask = async ({ newTask, participantIds }) => {
  const taskCreated = await Task.create(newTask);
  await taskCreated.setUserParticipants(participantIds);

  return taskCreated.dataValues;
};

exports.getAllTasks = (workspaceId) =>
  Task.findAll({
    where: {
      workspace_id: workspaceId,
    },
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
