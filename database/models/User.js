module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
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
    password: {
      type: DataTypes.CHAR(60),
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasOne(models.Character, {
      as: 'character'
    });
    User.belongsToMany(models.Workspace, {
      through: "users_has_workspaces",
      as: "workspaces",
    });
    User.hasMany(models.Task, {
      foreignKey: 'user_id',
      as: 'tasks'
    });
    User.belongsToMany(models.Task, {
      through: "participants",
      as: "taskParticipants",
    });
    User.belongsToMany(models.Task, {
      through: "comments",
      as: "taskComments"
    });
    User.belongsToMany(models.Task, {
      through: "attachments",
      as: "taskAttachments"
    });
  };

  return User;
};
