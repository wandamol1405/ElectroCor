'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SaleOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SaleOrder.belongsTo(models.User, {foreignKey: "id_user"})
    }
  }
  SaleOrder.init({
    id_order:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    date_order: DataTypes.DATE,
    id_user:{
      type: DataTypes.INTEGER,
      references:{
        model: "users",
        key: "id_user"
      }
    },
    total_order: DataTypes.DECIMAL(6, 2)
  }, {
    sequelize,
    modelName: 'SaleOrder',
  });
  return SaleOrder;
};
/*
id_order INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    date_order DATETIME,
    id_user INT,
    total_order DECIMAL(6 , 2 ),
    FOREIGN KEY (id_user)
        REFERENCES users (id_user)
*/