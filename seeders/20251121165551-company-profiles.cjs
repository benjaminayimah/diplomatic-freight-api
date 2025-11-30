'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('profiles', [
      {
        company_name: 'Diplomatic Freight & Logistics Services Ltd.',
        email: 'info@diplomaticfreight.com',
        phone: '+233(0) 30 290 8064',
        mobile: '+233(0) 24 839 4870',
        address_line_1: '3rd Floor, Room 310, KIA Aviance Cargo Village, Swissport.',
        address_line_2: 'Kotoka International Airport.',
        address_line_3: 'Accra-Ghana',
        po_box: 'P. O. Box 118, Airport, Accra-Ghana',
        website: 'www.diplomaticfreight.com',
        tagline: 'Global Logistics, Local Care',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('profiles', null, {});
  }
};
