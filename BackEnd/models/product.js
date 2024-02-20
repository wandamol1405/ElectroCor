'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {foreignKey: "id_category"})

    }
  }
  Product.init({
    id_product:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    price:{
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    id_category:{
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "id_category"
      }
    },
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
/*
 id_product INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10 , 2 ) NOT NULL,
    id_category INT,
    description VARCHAR(200),
    FOREIGN KEY (id_category)
        REFERENCES category (id_category)
*/