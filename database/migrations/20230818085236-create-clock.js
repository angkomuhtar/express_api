"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("clocks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      clock_in: {
        type: Sequelize.DATE,
      },
      clock_out: {
        type: Sequelize.DATE,
      },
      tipe: {
        type: Sequelize.ENUM,
        values: ["N", "NS", "DS", "OS"], //OS ="office Shift", N: Normal, DS : Day Shift, NS :Night Shift,
        defaultValue: "N",
      },
      status: {
        type: Sequelize.ENUM,
        values: ["A", "I", "S", "O", "L", "H"], //A:Alfa, I:Izin, S:Sakit, O:Off, L:cuti
        defaultValue: "A",
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
    await queryInterface.dropTable("clocks");
  },
};
