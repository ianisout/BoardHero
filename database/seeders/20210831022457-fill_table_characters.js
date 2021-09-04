"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          email: "felipe@email.com",
          first_name: "felipe",
          last_name: "felipe",
          password: bcrypt.hashSync("felipe"),
          position: "dev",
          company: "DH",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
