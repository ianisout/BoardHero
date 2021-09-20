module.exports = function (sequelize, DataTypes) {
  const Badge = sequelize.define("Badge", {
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
    description: {
      type: DataTypes.STRING,
    },
    image_path: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Badge.associate = (models) => {
    Badge.belongsToMany(models.Character, {
      through: "characters_has_badges",
      as: "characters",
    });
  };

  return Badge;
};
