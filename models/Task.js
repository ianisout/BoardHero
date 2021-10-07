const {
  Task,
  User,
  Attachment,
  Comment,
  Participant,
  Task_tag,
  Task_action,
} = require("../database/models");

exports.createTask = async ({ newTask, participantIds, tagValues }) => {
  const taskCreated = await Task.create(newTask);

  if (participantIds) {
    await taskCreated.setUserParticipants(participantIds);
  }

  if (tagValues) {
    let tagIds = [];

    for (let i = 0; i < tagValues.length; i++) {
      let tagInfo = await Task_tag.findOne({ where: { label: tagValues[i] }});
      if (!tagInfo) {
        tagInfo = await Task_tag.create({ label: tagValues[i] });
      }
      tagIds.push(tagInfo.dataValues.id);
    }

    await taskCreated.setTags(tagIds);
  }

  return taskCreated.dataValues;
};

exports.getAllTasks = (workspaceId) => Task.findAll({
  where: {
    workspace_id: workspaceId,
  }
});

exports.getTaskById = async (id) => {
  const taskGotByID = await Task.findByPk(id, {
    include: ["userParticipants", "userAttachments", "tags"],
  });

  return taskGotByID ? taskGotByID.dataValues : null;
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
