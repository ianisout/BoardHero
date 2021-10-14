const { Characters_has_element } = require('../database/models');
const CharacterModel = require('../models/Character');
const ElementModel = require('../models/Element');
const TypeOfElementModel = require('../models/TypeOfElement');
const CharacterHasElementsModel = require('../models/CharacterHasElements');

exports.getCharacterByUserId = id => CharacterModel.getCharacterByUserId(id);

exports.getCharacterElements = id => CharacterHasElementsModel.getCharacterElements(id);

exports.purchaseEquipment = (character_id, element_id) => CharacterHasElementsModel.purchaseEquipment(character_id, element_id);

exports.getOwnedEquipments = async character_id => {
  const ownedElements = [];
  const allElements = await Characters_has_element.findAll({
    where: { character_id },
  });

  for (let i = 0; i < allElements.length; i++) {
    const elementId = allElements[i].dataValues.element_id;
    const isEquipped = allElements[i].dataValues.is_equipped;
    const elementData = await ElementModel.findByPk(allElements[i].dataValues.element_id);
    
    const typeData = await TypeOfElementModel.findElementsById(elementId);
    const elementName = elementData.dataValues.name;
    const typeOfElement = typeData.dataValues.type_of_element_id;

    if (typeOfElement === 3 || typeOfElement === 10 || typeOfElement === 13) {
      ownedElements.push({
        elementId,
        elementName,
        isEquipped,
        imagePath: elementData.dataValues.image_path
      })
    }
  }

  return ownedElements;
}