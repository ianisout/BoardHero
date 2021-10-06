const ElementModel = require('../models/Element');

exports.findAllEquips = async () => {
  const elements = await ElementModel.findAllEquips();

  console.log(elements);

  return elements;
}