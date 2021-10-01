const {
  Task,
  User,
  Attachment,
  Comment,
  Participant,
  Task_status,
} = require("../database/models");

exports.createTask = async ({ newTask, participantIds }) => {
  const taskCreated = await Task.create(newTask);
  await taskCreated.setUserParticipants(participantIds);
  return taskCreated.dataValues;
};

exports.getAllTasks = () => Task.findAll();

exports.getTaskById = async (id) => {
  const taskGotByID = await Task.findByPk(id);

  return taskGotByID;
};

exports.addAttachments = async (attachments) => {
  await Attachment.bulkCreate(attachments);
};

exports.addStatusToTask = async (id, status) => {
  const task = await Task.findByPk(id);

  const statusAdded = task.statusAdded(status);

  return statusAdded;
};

exports.actionsToTask = async (id, actions) => {
  const task = await Task.findByPk(id);

  const taskActions = task.actionsAdded(actions);

  return taskActions;
};

exports.destroy = (id) =>
  Task.destroy({
    where: {
      id,
    },
  });
