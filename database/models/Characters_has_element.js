module.exports = function (sequelize, DataTypes) {
    const Characters_has_element = sequelize.define("Characters_has_element", {
        id: {
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          type: DataTypes.INTEGER.UNSIGNED,
        },
        is_equipped: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        character_id: {
          allowNull: false,
          type: DataTypes.INTEGER.UNSIGNED,
        },
        element_id: {
          allowNull: false,
          type: DataTypes.INTEGER.UNSIGNED,
        },
    });
  
    return Characters_has_element;
  };
  