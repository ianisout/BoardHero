module.exports = function (sequelize, DataTypes) {
  const Type_of_elements = sequelize.define("Type_of_elements", {
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

  return Type_of_elements;
};
