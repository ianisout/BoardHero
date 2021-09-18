"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "participants",
      [
        {
          email: "felipe@email.com",
          first_name: "Felipe",
          last_name: "Felipe",
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("participants", null, {});
  },
};
