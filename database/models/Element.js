module.exports = function (sequelize, DataTypes) {
  const Element = sequelize.define("Element", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    image_path: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
    },
    level: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    type_of_element_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  });

  Element.associate = (models) => {
    Element.belongsTo(models.TypeOfElement, {
      foreignKey: "type_of_element_id",
      as: "type",
    });
    Element.belongsToMany(models.Character, {
      through: "characters_has_elements",
      as: "characters",
    });
  };
  return Element;
};
