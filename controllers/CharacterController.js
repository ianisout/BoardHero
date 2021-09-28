const CharacterModel = require('../models/Character');
const CharacterHasElementsModel = require('../models/CharacterHasElements');

exports.getCharacterByUserId = id => CharacterModel.getCharacterByUserId(id);

exports.getCharacterElements = id => CharacterHasElementsModel.getCharacterElements(id);