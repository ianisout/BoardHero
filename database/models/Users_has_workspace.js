module.exports = function (sequelize, DataTypes) {
    const Users_has_workspace = sequelize.define("Users_has_workspace", {
        id: {
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          type: DataTypes.INTEGER.UNSIGNED,
        },
        is_admin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        user_id: {
          allowNull: false,
          type: DataTypes.INTEGER.UNSIGNED,
        },
        workspace_id: {
          allowNull: false,
          type: DataTypes.INTEGER.UNSIGNED,
        },
    });
  
    return Users_has_workspace;
  };
  