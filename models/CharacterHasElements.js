const { Characters_has_element } = require('../database/models');

exports.createCharacter = async (character_id, element_id) => {
  await Characters_has_element.create({
    is_equipped: 1,
    character_id,
    element_id,
  });
};

exports.getCharacterElements = async (id) => {
  const elements = await Characters_has_element.findAll({
    where: {
      character_id: id,
    },
  });

  const arrayOfIds = [];

  for (let i = 0; i < elements.length; i++) {
    arrayOfIds.push(elements[i].dataValues.element_id)
  }

  return arrayOfIds;
};
