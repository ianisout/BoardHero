const { Element } = require('../database/models');
const CharacterHasElementsModel = require('./CharacterHasElements');

exports.findByPk = async (id) => {
  const element = await Element.findByPk(id);

  return element;
};

exports.findAllEquips = async () => {
  const generalEquips = await Element.findAll({
    where: {
      type_of_element_id: 3,
    },
    attributes: [`id`, `image_path`, `name`, `description`, `level`, `price`]
  })

  const shields = await Element.findAll({
    where: {
      type_of_element_id: 10,
    },
    attributes: [`id`, `image_path`, `name`, `description`, `level`, `price`]
  })

  const swords = await Element.findAll({
    where: {
      type_of_element_id: 13,
    },
    attributes: [`id`, `image_path`, `name`, `description`, `level`, `price`]
  })

  const allEquips = [generalEquips.map(equip => equip.dataValues), shields.map(equip => equip.dataValues), swords.map(equip => equip.dataValues)]
    .flat()
    .sort((a,b) => (a.level > b.level) ? 1 : ((b.level > a.level) ? -1 : 0))

  return allEquips;
}

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
