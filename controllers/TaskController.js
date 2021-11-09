const TaskModel = require("../models/Task");
const UserModel = require("../models/User");

exports.createTask = async ({
  user_id,
  workspace_id,
  task_name,
  start_date,
  end_date,
  description,
  participantIds,
  actions,
  tagValues,
  filesInfo,
}) => {
  try {
    const newTask = {
      name: task_name,
      start_date,
      end_date,
      description,
      user_id,
      workspace_id,
      task_status_id: 1, // default status = open
    };

    const taskCreated = await TaskModel.createTask({
      newTask,
      participantIds,
      tagValues,
    });
    console.log(taskCreated);

    const task_id = taskCreated.id;

    if (filesInfo.length > 0) {
      const attachments = filesInfo.map((file) => {
        return {
          file_name: file.originalname,
          file_path: file.path,
          task_id,
          user_id,
        };
      });
      TaskModel.addAttachments(attachments);
    }
  } catch (error) {
    console.error(error);
  }
};

exports.getAllTasks = (workspaceId) => TaskModel.getAllTasks(workspaceId);

exports.getTaskById = async (id) => {
  const { userParticipants, tags, ...task } = await TaskModel.getTaskById(id);

  const participantsFormatted = userParticipants.map((user) => user.email);
  task.participants = participantsFormatted;

  const tagsFormatted = tags.map((tag) => tag.label);
  task.tags = tagsFormatted;

  return task;
};

exports.updateStatus = (id, task_status_id) =>
  TaskModel.updateStatus(id, task_status_id);

exports.deleteTask = (id) => TaskModel.destroy(id);

exports.addComment = async (user, task_id, text) => {
  const comment = {
    text,
    task_id,
    user_id: user,
  };
  await TaskModel.addComment(comment);
};

exports.findAllComments = async (taskId) => {
  const commentsData = [];
  const comments = await TaskModel.findAllComments(taskId);

  for (let i = 0; i < comments.length; i++) {
    const userName = await UserModel.findByPk(comments[i].dataValues.user_id);
    const dateTime = new Date(comments[i].dataValues.updatedAt).toLocaleString().split(' ');
    const date = dateTime[0].split('/').reverse();
    const time = dateTime[1].split(':');
    const updatedAt = `${date[0]}/${date[1]}/${date[2]} ${time[0]}:${time[1]}`;

    commentsData.push({
      userId: comments[i].dataValues.user_id,
      userName: `${userName.dataValues.first_name} ${userName.dataValues.last_name}`,
      text: comments[i].dataValues.text,
      updatedAt: updatedAt,
    });
  }

  return commentsData;
};

exports.getAllTags = async () => {
  const tagsArray = [];

  const tags = await TaskModel.getAllTags();
  tags.forEach((tag) => tagsArray.push(tag.label));

  return tagsArray;
};

exports.setParticipants = async ({ taskId, participantIds }) =>
  await TaskModel.setParticipants({ taskId, participantIds });

exports.setTags = async ({ taskId, tagValues }) =>
  await TaskModel.setTags({ taskId, tagValues });

exports.setDescription = async ({ taskId, description }) =>
  await TaskModel.setDescription({ taskId, description });