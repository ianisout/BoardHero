const {
  Task,
  User,
  Attachment,
  Comment,
  Participant,
  Task_action,
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

exports.getTask = async () => {
  const uniqueTask = await Task.findOne({
    where: {
      id,
    },
    attributes: ["participants"],
  });

  return uniqueTask;
};

exports.addAttachments = async (attachments) => {
  await Attachment.bulkCreate(attachments);
};

exports.taskActions = async (actions) => await Task_action.create(actions);

exports.destroy = (id) =>
  Task.destroy({
    where: {
      id,
    },
  });
