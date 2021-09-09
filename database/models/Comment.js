module.exports = function (sequelize, DataTypes) {
  const Comment = sequelize.define("Comment", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      text: {
        type: DataTypes.STRING(1000),
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
