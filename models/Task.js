const {
  Task,
  User,
  Attachment,
  Comment,
  Participant,
  Task_status,
  Task_action
} = require("../database/models");

exports.createTask = async ({ newTask, participantIds, actions }) => {
  const taskCreated = await Task.create(newTask);
  await taskCreated.setUserParticipants(participantIds);
  await taskCreated.setActionsTask(actions);
  
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

exports.destroy = (id) =>
  Task.destroy({
    where: {
      id,
    },
  });
