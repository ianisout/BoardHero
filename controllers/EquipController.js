const { Characters_has_element } = require('../database/models');
const ElementModel = require('../models/Element');

exports.findAllEquips = async () => await ElementModel.findAllEquips();

exports.findCharacterElements = async character_id => {
  const characterVisualElements = [];
  const allElements = await Characters_has_element.findAll({
    where: { character_id },
  });
  
  for (let i = 0; i < allElements.length; i++) {
    const isEquipped = allElements[i].dataValues.is_equipped;
    const elementData = await ElementModel.findByPk(allElements[i].dataValues.element_id);

    characterVisualElements.push({
      imagePath: elementData.dataValues.image_path,
      isEquipped,
    })
  }

  return characterVisualElements;
}