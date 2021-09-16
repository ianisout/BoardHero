module.exports = function (sequelize, DataTypes) {
  const Task = sequelize.define("Task", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
    },
    description: {
      type: DataTypes.STRING(2000),
    },
    workspace_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    task_status_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  });

  Task.associate = (models) => {
    Task.belongsTo(models.Workspace, {
      foreignKey: "workspace_id",
      as: "workspace",
    });

    Task.belongsTo(models.Task_status, {
      foreignKey: "task_status_id",
      as: "task_status",
    });

    Task.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    Task.belongsToMany(models.User, {
      through: "participants",
      as: "user_participants",
    });
  
    Task.belongsToMany(models.User, {
      through: "comments",
      as: "user_comments"
    });

    Task.belongsToMany(models.User, {
      through: "attachments",
      as: "user_attachments"
    });

    Task.belongsToMany(models.Task_tag, {
      through: "tasks_has_tags",
      as: "tags",
    });

    Task.belongsToMany(models.Task_action, {
      through: "tasks_has_actions",
      as: "actions",
    });
  };

  return Task;
};
