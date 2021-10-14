const { Characters_has_element } = require('../database/models');
const ElementModel = require('../models/Element');

exports.findAllEquips = async () => await ElementModel.findAllEquips();

exports.findCharacterElements = async character_id => {
  const characterVisualElements = [];
  const allElements = await Characters_has_element.findAll({
    where: { character_id },
  });
  
  for (let i = 0; i < allElements.length; i++) {
    const elementData = await ElementModel.findByPk(allElements[i].dataValues.element_id);
    const typeOfElement = elementData.dataValues.type_of_element_id;

    if (typeOfElement !== 3 && typeOfElement !== 10 && typeOfElement !== 13) {
      characterVisualElements.push(elementData.dataValues.image_path)
    }
  }

  return characterVisualElements;
}