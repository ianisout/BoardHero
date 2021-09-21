"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("elements",
      [
        {
          name: "black",
          description: "Skin color",
          level: 0,
          price: 0,
          image_path: "/images/characters/naked-black.png",
          type_of_element_id: 1
        },
        {
          name: "brown",
          description: "Skin color",
          level: 0,
          price: 0,
          image_path: "/images/characters/naked-brown.png",
          type_of_element_id: 1
        },
        {
          name: "purple",
          description: "Skin color",
          level: 0,
          price: 0,
          image_path: "/images/characters/naked-purple.png",
          type_of_element_id: 1
        },
        {
          name: "white",
          description: "Skin color",
          level: 0,
          price: 0,
          image_path: "/images/characters/naked-white.png",
          type_of_element_id: 1
        },
        {
          name: "dress1",
          description: "",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/dress/dress2.png",
          type_of_element_id: 2
        },
      ], {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("elements", null, {});
  },
};
