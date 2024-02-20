'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SaleOrders', {
      id_order:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      date_order: Sequelize.DATE,
      id_user:{
        type: Sequelize.INTEGER,
        references:{
          model: "users",
          key: "id_user"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      total_order: Sequelize.DECIMAL(6, 2),
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SaleOrders');
  }
};