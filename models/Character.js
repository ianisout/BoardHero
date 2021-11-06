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
    attributes: ['user_id', 'id', 'char_level', 'experience', 'coins'],
  });

  return character.dataValues;
};

exports.updateCoinsExp = async (userId, amountCoins, amountExp) => {
  const character = await Character.findOne({
    where: { user_id: userId },
    attributes: ['user_id', 'id', 'char_level', 'experience', 'coins'],
  });

  try {
    character.coins += amountCoins;
    character.experience += amountExp;

    if (character.experience >= 100) {
      character.char_level++;
      character.experience = character.experience-100;
    }
    
    await character.save();
  } catch(err) {
    console.log(err)
  }

  return character;
}