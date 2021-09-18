module.exports = function (sequelize, DataTypes) {
  const Participant = sequelize.define("Participant", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    email: {
      type: DataTypes.CHAR(126),
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Participant.associate = (models) => {
    Participant.belongsToMany(models.Task, {
      through: "tasks_has_participants",
      as: "task_participants",
    });
  };

  return Participant;
};
