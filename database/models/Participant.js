module.exports = function (sequelize, DataTypes) {
    const Participant = sequelize.define("Participant", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      task_id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
      },
    });
  
    return Participant;
  };