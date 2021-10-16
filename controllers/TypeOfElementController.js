const TypeOfElementModel = require("../models/TypeOfElement");

exports.findAll = async () => {
  const elementTypes = await TypeOfElementModel.findAll();
  
  return elementTypes;
}

exports.findElementsById = async (arrayOfIds) => {
  const arrayOfUrls = [];

  for (let i = 0; i < arrayOfIds.length; i++) {
    const element = await TypeOfElementModel.findElementsById(arrayOfIds[i])
    arrayOfUrls.push(element.dataValues.image_path)
  }

  return arrayOfUrls;
}
