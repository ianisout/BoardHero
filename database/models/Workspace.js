module.exports = function (sequelize, DataTypes) {
  const Workspace = sequelize.define("Workspace", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Workspace.associate = (models) => {
    Workspace.belongsTo(models.User, {
      through: "users_has_workspaces",
      as: "users"
    });
  };
  return Workspace;
};
