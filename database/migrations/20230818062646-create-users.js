"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING(35),
      },
      email: {
        type: Sequelize.STRING(35),
      },
      password: {
        type: Sequelize.STRING(100),
      },
      status: {
        type: Sequelize.ENUM("Y", "N"),
        defaultValue: "Y",
      },
      user_tipe: {
        type: Sequelize.STRING(30),
      },
      refresh_token: {
        type: Sequelize.TEXT,
      },
      phone_id: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
