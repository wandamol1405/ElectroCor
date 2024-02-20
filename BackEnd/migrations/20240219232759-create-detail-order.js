'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetailOrders', {
      id_detail:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      id_order:{
        type: Sequelize.INTEGER,
        references:{
          model: "saleorders",
          key: "id_order"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      }, 
      id_product:{
        type: Sequelize.INTEGER,
        references:{
          model: "products",
          key: "id_product"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      amount: Sequelize.INTEGER,
      sale_price: Sequelize.DECIMAL(6, 2),
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
    await queryInterface.dropTable('DetailOrders');
  }
};