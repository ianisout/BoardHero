module.exports = function (sequelize, DataTypes) {
  const Task_tag = sequelize.define("Task_tag", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Task_tag.associate = (models) => {
    Task_tag.belongsToMany(models.Task, {
      through: "task_has_tags",
      as: "tasks",
    });
  };

  return Task_tag;
};
