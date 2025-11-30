'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin User',
        email: 'info@diplomaticfreight.com',
        password: await bcrypt.hash('diplomatic123#@!', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Benjamin Ayimah',
        email: 'benjaminayimah@gmail.com',
        password: await bcrypt.hash('123456#@!', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
