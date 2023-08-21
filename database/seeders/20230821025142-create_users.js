"use strict";

const moment = require("moment");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    bcrypt.genSalt(parseInt(process.env.SALT_ROUND), function (err, salt) {
      bcrypt.hash("secret", salt, async function (err, hash) {
        // Store hash in your password DB.
        await queryInterface.bulkInsert("users", [
          {
            id: 1,
            username: "Admin",
            email: "admin@api.com",
            password: hash,
            status: "Y",
            user_tipe: "Administrator",
            refresh_token: null,
            phone_id: null,
            createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          },
        ]);

        await queryInterface.bulkInsert("profiles", [
          {
            user_id: 1,
            first_name: "Admin",
            last_name: "API",
            phone: "083555555",
            gender: "M",
            avatar: "",
            createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          },
        ]);
      });
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
