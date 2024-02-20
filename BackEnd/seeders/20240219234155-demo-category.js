'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('Category', [{
        id_category: 1,
        name: 'Electrodomesticos',
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15")
      }, {
        id_category: 2,
        name: 'Computadoras',
        createdAt: new Date("2024-01-30"),
        updatedAt: new Date("2024-01-30")
      }], {});
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Category', null, {});
  }
};
