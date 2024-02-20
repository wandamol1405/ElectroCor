'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DetailOrder.belongsTo(models.SaleOrder, {foreignKey: "id_order"}),
      DetailOrder.belongsTo(models.Product, {foreignKey: "id_product"})
    }
  }
  DetailOrder.init({
    id_detail:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_order:{
      type: DataTypes.INTEGER,
      references:{
        model: "saleorders",
        key: "id_order"
      }
    }, 
    id_product:{
      type: DataTypes.INTEGER,
      references:{
        model: "products",
        key: "id_product"
      }
    },
    amount: DataTypes.INTEGER,
    sale_price: DataTypes.DECIMAL(6, 2)
  }, {
    sequelize,
    modelName: 'DetailOrder',
  });
  return DetailOrder;
};
/*
 id_detail_order INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_order INT,
    id_product INT,
    amount INT,
    sale_price DECIMAL(6 , 2 ),
    FOREIGN KEY (id_order)
        REFERENCES sale_order (id_order),
    FOREIGN KEY (id_product)
        REFERENCES products (id_product)
*/