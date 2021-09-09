module.exports = function (sequelize, DataTypes) {
  const Attachment = sequelize.define("Attachment", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_path: {
      type: DataTypes.STRING(80),
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

  return Attachment;
};
