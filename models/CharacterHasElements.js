const { Characters_has_element, Element, Character } = require('../database/models');

exports.createCharacter = async (characterId, element_id) => {
  await Characters_has_element.create({
    is_equipped: 1,
    character_id: characterId,
    element_id,
  });
};

exports.getCharacterElements = async (characterId) => {
  const elements = await Characters_has_element.findAll({
    where: {
      character_id: characterId,
    },
  });

  const arrayOfIds = [];

  for (let i = 0; i < elements.length; i++) {
    arrayOfIds.push(elements[i].dataValues.element_id)
  }

  return arrayOfIds;
};

exports.purchaseEquipment = async (character, characterId, id) => {
  const element = await Element.findByPk(id);
  const elemLv = element.dataValues.level;
  const elemPrice = element.dataValues.price;

  if (character.coins < elemPrice) {
    return 'COINS_ERROR'
  }

  if (character.char_level < elemLv) {
    return "LVL_ERROR"
  }

  try {
    await Characters_has_element.create({
      is_equipped: 0,
      character_id: characterId,
      element_id: id,
    });
  
    character.coins -= elemPrice;
    await character.save();
  } catch (err) {
    console.log(err)
  }

  return 'SUCCESS';
}

exports.setEquipmentStatus = async (id) => {
  const elementData = await Characters_has_element.findByPk(id);

  if (elementData.dataValues.is_equipped) {
    await Characters_has_element.update({ is_equipped: false },
    { where: { id }})
  } else {
    await Characters_has_element.update({ is_equipped: true },
    { where: { id }})
  }

  return elementData;
}