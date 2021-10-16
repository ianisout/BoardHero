"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          first_name: "Felipe",
          last_name: "Felipe",
          email: "felipe@email.com",
          password: bcrypt.hashSync("felipe"),
          position: "Dev",
          company: "BoardHero",
        },
        {
          first_name: "Nath",
          last_name: "Nath",
          email: "nath@email.com",
          password: bcrypt.hashSync("nath"),
          position: "Dev",
          company: "BoardHero",
        },
        {
          first_name: "Ian",
          last_name: "Ian",
          email: "ian@email.com",
          password: bcrypt.hashSync("ian"),
          position: "Dev",
          company: "BoardHero",
        },
        {
          first_name: "Adriano",
          last_name: "Adriano",
          email: "adriano@email.com",
          password: bcrypt.hashSync("adriano"),
          position: "Dev",
          company: "BoardHero",
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
