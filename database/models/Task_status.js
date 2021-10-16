module.exports = function (sequelize, DataTypes) {
  const Task_status = sequelize.define("Task_status", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
  });

  Task_status.associate = (models) => {
    Task_status.hasMany(models.Task, {
      foreignKey: 'task_status_id',
      as: 'tasks'
    });
  }

  return Task_status;
};
