const { Task, User, Attachment, Comment, Participant } = require("../database/models");

exports.createTask = async (newTask) => {
  const taskCreated = await Task.create(newTask);
  /** 
   * 
   *  Need to implement the 'participants', 'tags', and 'actions' parts
   * 
  **/
  return taskCreated.dataValues;
};

exports.addAttachments = async (attachments) => {
  await Attachment.bulkCreate(attachments);
};
