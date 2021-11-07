"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("type_of_elements",
      [
        {
          type: "skincolor",
        },
        {
          type: "dress",
        },
        {
          type: "equipment",
        },
        {
          type: "eyes",
        },
        {
          type: "glasses",
        },
        {
          type: "hairback",
        },
        {
          type: "hairfront",
        },
        {
          type: "mouth",
        },
        {
          type: "pants",
        },
        {
          type: "shield",
        },
        {
          type: "shirt",
        },
        {
          type: "shoe",
        },
        {
          type: "sword",
        },
        {
          type: "beard",
        },
        {
          type: "tie",
        },
      ], {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("type_of_elements", null, {});
  },
};
