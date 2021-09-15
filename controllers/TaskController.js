const TaskModel = require("../models/Task");

exports.createTask = async ({
  user_id,
  workspace_id,
  task_name,
  start_date,
  end_date,
  description,
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
      workspace_id,
      task_status_id: 1, // default status = open
    };

    const taskCreated = await TaskModel.addTaskToUser(user_id, newTask);
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
