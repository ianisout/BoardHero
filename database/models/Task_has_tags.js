module.exports = function (sequelize, DataTypes) {
  const Users_has_workspace = sequelize.define("Tasks_has_tags", {
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

  return Users_has_workspace;
};
