const { Characters_has_element } = require('../database/models');
const ElementModel = require('../models/Element');
const CharacterHasElementsModel = require('../models/CharacterHasElements');

exports.findAllEquips = async () => await ElementModel.findAllEquips();

exports.findCharacterElements = async characterId => {
  const characterVisualElements = [];
  const allElements = await Characters_has_element.findAll({
    where: { character_id:characterId },
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

exports.setEquipmentStatus = async id => await CharacterHasElementsModel.setEquipmentStatus(id);