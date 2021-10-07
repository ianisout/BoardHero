const CharacterModel = require('../models/Character');
const CharacterHasElementsModel = require('../models/CharacterHasElements');

exports.getCharacterByUserId = id => CharacterModel.getCharacterByUserId(id);

exports.getCharacterElements = id => CharacterHasElementsModel.getCharacterElements(id);

exports.purchaseEquipment = (character_id, element_id) => CharacterHasElementsModel.purchaseEquipment(character_id, element_id);