const TypeOfElementModel = require("../models/TypeOfElement");

exports.findAll = async () => {
  const elementTypes = await TypeOfElementModel.findAll();
  
  return elementTypes;
}