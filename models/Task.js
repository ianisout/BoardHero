const {
  Task,
  User,
  Attachment,
  Comment,
  Participant,
} = require("../database/models");

exports.createTask = async (newTask) => {
  const taskCreated = await Task.create(newTask);

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
      id
    },
    attributes: ["participants"]
  });

  return uniqueTask;
};

exports.addAttachments = async (attachments) => {
  await Attachment.bulkCreate(attachments);
};

exports.addParticipants = async () => await Participant.findAll();

exports.destroy = (id) =>
  Task.destroy({
    where: {
      id,
    },
  });
