'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('payments').catch(() => null);
    if (!table) {
      await queryInterface.createTable('payments', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        payment_method: {
          type: Sequelize.ENUM('bank_transfer', 'usdt_wallet'),
          allowNull: false,
        },
        bank_name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        account_name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        bank_branch: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        account_number: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        swift_code: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        wallet_address: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        network: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        qr_code: {
          type: Sequelize.STRING,
          allowNull: true,
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
    await queryInterface.dropTable('payments');
  }
};