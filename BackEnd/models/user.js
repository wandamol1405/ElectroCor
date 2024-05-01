'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    usuario:{
      type: DataTypes.STRING(10),
      allowNull: false
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    birth_date: DataTypes.DATEONLY,
    postal_code: DataTypes.INTEGER(4),
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
/*
 id_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    usuario VARCHAR(10) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(8) NOT NULL,
    birth_date DATE,
    postal_code INT(4),
    is_admin BOOLEAN DEFAULT FALSE
*/