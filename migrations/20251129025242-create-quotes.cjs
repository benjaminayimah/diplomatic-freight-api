'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('quotes').catch(() => null);
    if (!table) {
       await queryInterface.createTable('quotes', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        departure_city: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        destination_city: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cargo_type: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        weight: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        dimensions: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        shipping_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        additional_info: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('quotes');
  }
};