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
  return Task_status;
};
