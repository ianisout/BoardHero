module.exports = function (sequelize, DataTypes) {
  const Task_has_Actions = sequelize.define("Task_has_Actions", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    task_id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    task_action_id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
  });
  return Task_has_Actions;
};
