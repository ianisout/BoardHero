const { TypeOfElement }  = require("../database/models");

exports.findAll = async () => {
  const elementTypes = await TypeOfElement.findAll()

  return elementTypes;
};
