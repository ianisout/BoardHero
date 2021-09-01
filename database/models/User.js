module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    email: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING(60),
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
    character_id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Task, {
      through: "user_has_tasks",
      as: "tasks",
    });

    User.hasMany(models.Workspace, {
      through: "users_has_workspaces",
      as: "workspaces",
    });
  };

  return User;
};
