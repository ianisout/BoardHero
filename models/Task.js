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
      let tagInfo = await Task_tag.findOne({ where: { label: tagValues[i] } });
      if (!tagInfo) tagInfo = await Task_tag.create({ label: tagValues[i] });
      
      tagIds.push(tagInfo.dataValues.id);
    }

    await taskCreated.setTags(tagIds);
  }

  return taskCreated.dataValues;
};

exports.getAllTasks = (workspaceId) =>
  Task.findAll({
    where: {
      workspace_id: workspaceId,
    },
    include: ["tags"]
  });

exports.getTaskById = async (id) => {
  const taskGotByID = await Task.findByPk(id, {
    include: ["userParticipants", "userAttachments", "tags"],
  });

  return taskGotByID ? taskGotByID.dataValues : null;
};

exports.addAttachments = async (attachments) => {
  await Attachment.bulkCreate(attachments);
};

exports.updateStatus = async (id, task_status_id) => {
  const taskFound = await Task.findByPk(id);

  if ( taskFound.task_status_id === 3) {
    taskFound.task_status_id --;
  } else {
    taskFound.task_status_id++;
  }

  await taskFound.save();

  return taskFound;
};

exports.setParticipants = async ({ taskId, participantIds }) => {
  if (!participantIds) participantIds = [];
  const task = await Task.findByPk(taskId);
  await task.setUserParticipants(participantIds);
}

exports.setTags = async ({ taskId, tagValues }) => {
  let tagIds = [];

  if (tagValues) {
    for (let i = 0; i < tagValues.length; i++) {
      let tagInfo = await Task_tag.findOne({ where: { label: tagValues[i] } });
      if (!tagInfo) tagInfo = await Task_tag.create({ label: tagValues[i] });
      
      tagIds.push(tagInfo.dataValues.id);
    }
  }

  const task = await Task.findByPk(taskId);
  await task.setTags(tagIds);
}

exports.addComment = async (comment) => {
  await Comment.create(comment)
}

exports.findAllComments = async(taskId) => {
  const comments = await Comment.findAll({
    where: {
      task_id: taskId
    }
  })
  return comments;
} 

exports.destroy = (id) =>
  Task.destroy({
    where: {
      id,
    }
});