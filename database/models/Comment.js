module.exports = function (sequelize, DataTypes) {
  const Comment = sequelize.define("Comment", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      task_id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
      },
  });

  return Comment;
};
