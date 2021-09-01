module.exports = function (sequelize, DataTypes) {
  const Character = sequelize.define("Character", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    char_level: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    experience: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    coins: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
  });

  Character.associate = (models) => {
    Character.hasMany(models.Badge, {
      through: "characters_has_badges",
      as: "badges",
    });
  };
  Character.belongsToMany(models.Element, {
    through: "character_has_elements",
    as: "elements",
  });
  return Character;
};
