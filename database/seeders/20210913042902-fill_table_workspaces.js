'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('workspaces', [
      {
        name: "Felipe's Workspace",
      },
      {
        name: "Nath's Workspace",
      },
      {
        name: "Ian's Workspace",
      },
      {
        name: "Adriano's Workspace",
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('workspaces', null, {});
  }
};
