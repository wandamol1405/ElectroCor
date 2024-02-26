'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id_product:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false
      },
      price:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      id_category:{
        type: Sequelize.INTEGER,
        references: {
          model: "category",
          key: "id_category"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      description: DataTypes.STRING,
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
    await queryInterface.dropTable('Products');
  }
};