const { Task, User, Attachment, Comment } = require("../database/models");

exports.addTaskToUser = async (user_id, newTask) => {
  const user = await User.findByPk(user_id);
  const taskCreated = await user.createTask(newTask);
  /** 
   * 
   *  Need to implement the 'tags' and 'actions' parts
   * 
  **/
  return taskCreated.dataValues;
};

exports.addAttachments = async (attachments) => {
  await Attachment.bulkCreate(attachments);
};
