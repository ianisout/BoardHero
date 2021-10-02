const { Element } = require('../database/models');
const CharacterHasElementsModel = require('./CharacterHasElements');

exports.findByPk = async (id) => {
  const element = await Element.findByPk(id);

  return element;
};

exports.setCharacterElements = async (elements, character_id) => {
  if (elements === undefined)
    CharacterHasElementsModel.createCharacter(character_id, 3);

  for (let element in elements) {
    if (Number(elements[element]) !== 0) {
      const name = element + elements[element];
      const elementFound = await Element.findOne({ where: { name } });
      const element_id = elementFound.dataValues.id;

      await CharacterHasElementsModel.createCharacter(character_id, element_id);
    }
  }
};
