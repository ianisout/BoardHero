const { Character } = require('../database/models');

exports.createCharacter = async (user_id) => {
  const createdCharacter = await Character.create({
    char_level: 0,
    experience: 0,
    coins: 0,
    user_id,
  });

  return createdCharacter.dataValues;
};

exports.getCharacterByUserId = async (id) => {
  const character = await Character.findOne({
    where: {
      user_id: id,
    },
    attributes: ['user_id', 'id'],
  });

  return character.dataValues;
};
