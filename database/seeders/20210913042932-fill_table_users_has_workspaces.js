'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users_has_workspaces', [
      {
        user_id: 1,
        workspace_id: 1,
        is_admin: true,
      },
      {
        user_id: 2,
        workspace_id: 2,
        is_admin: true,
      },
      {
        user_id: 3,
        workspace_id: 3,
        is_admin: true,
      },
      {
        user_id: 4,
        workspace_id: 4,
        is_admin: true,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users_has_workspaces', null, {});
  }
};
