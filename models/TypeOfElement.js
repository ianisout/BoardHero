const { TypeOfElement, Element }  = require("../database/models");

exports.findAll = async () => {
  const elementTypes = await TypeOfElement.findAll()

  return elementTypes;
};

exports.findElementsById = async (id) => Element.findByPk(id);
