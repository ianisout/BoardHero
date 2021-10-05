'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('characters', [
      {
        user_id: 1,
        char_level: 0,
        experience: 0,
        coins: 0,
      },
      {
        user_id: 2,
        char_level: 0,
        experience: 0,
        coins: 0,
      },
      {
        user_id: 3,
        char_level: 0,
        experience: 0,
        coins: 0,
      },
      {
        user_id: 4,
        char_level: 0,
        experience: 0,
        coins: 0,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('characters', null, {});
  }
};
