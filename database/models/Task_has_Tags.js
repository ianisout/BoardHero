module.exports = function (sequelize, DataTypes) {
  const Task_has_Tags = sequelize.define("Task_has_Tags", {
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
    task_tag_id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
  });
  return Task_has_Tags;
};
