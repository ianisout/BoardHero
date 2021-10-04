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
  tags,
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
      tags,
      actions,
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

exports.getAllTasks = () => TaskModel.getAllTasks();

exports.getTaskById = async (id) => { 
  const { userParticipants, ...task } = await TaskModel.getTaskById(id);
  const participantsFormatted = userParticipants.map(user => user.email);
  
  task.participants = participantsFormatted;

  return task;
};

exports.deleteTask = (id) => TaskModel.destroy(id);

exports.taskToTags = ({ taskId, taskTagId }) => {
  TaskModel.taskToTags({ taskId, taskTagId });
};

exports.taskToTags = ({ taskId, taskActionId }) => {
  TaskModel.taskToTags({ taskId, taskActionId });
};

exports.getTagsTasks = async (tagsId) => {
  const tagsTasks = await TaskModel.getTagsTask(tagsId);

  const tagsList = tagsTasks.map(tag => {
    return {
      
    };
  });
  return tagsList;
};
