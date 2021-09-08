"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          first_name:"Felipe",
          last_name:"felipe",
          email:"felipe@email.com",
          confirmEmail:"felipe@email.com",
          password:"felipe",
          confirmPassword:"felipe",
          position:"dev",
          company:"dh", 
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
