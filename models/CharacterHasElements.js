const { Characters_has_element } = require("../database/models")

exports.createCharacter = async (character_id, element_id) => {
  await Characters_has_element.create({
    is_equipped: 1,
    character_id,
    element_id
  })
}

// exports.addElements = async (element) => {
//   await Characters_has_element.bulkCreate(element);
// };