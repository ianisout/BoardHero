const { Element }  = require("../database/models");

exports.findElementByType = async (typeId) => {
  const elements = await Element.findAll({ where: { type_of_element_id: typeId }})
  
  return elements;
};
