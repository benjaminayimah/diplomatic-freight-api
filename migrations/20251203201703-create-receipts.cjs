'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('receipts').catch(() => null);
    if (!table) {
      await queryInterface.createTable('receipts', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        receipt_number: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        invoice_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        paid_on: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        payment_method: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        items: {
          type: Sequelize.JSON,
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        address: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        vat: {
          type: Sequelize.STRING,
          allowNull: true
        },
        issued_by: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        }
      });
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('receipts');
  }
};