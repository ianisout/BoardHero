"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("task_status",
      [
        {
          description: "Open",
        },
        {
          description: "In Progress",
        },
        {
          description: "Done",
        },
        {
          description: "Pending Tests",
        },
        {
          description: "Pending Approval",
        }
      ], {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("task_status", null, {});
  },
};
