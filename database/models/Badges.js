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
      type: Sequelize.STRING(100),
    },
    image_path: {
      type: Sequelize.STRING(80),
      allowNull: false,
    },
  });

  Badge.associate = (models) => {
    Badge.belongsTo(models.Character, {
      through: "characters_has_badges",
      as: "characters",
    });
  };

  return Badge;
};
