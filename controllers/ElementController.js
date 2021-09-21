const ElementModel = require("../models/Element");

exports.findElementByType = (typeId) => {
  const elements = ElementModel.findElementByType(typeId);
  
  return elements;
}