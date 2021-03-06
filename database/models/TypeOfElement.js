module.exports = function (sequelize, DataTypes) {
  const TypeOfElement = sequelize.define("TypeOfElement", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  TypeOfElement.associate = (models) => {
    TypeOfElement.hasMany(models.Element, {
      foreignKey: 'type_of_element_id',
      as: 'elements'
    });
  };

  return TypeOfElement;
};
