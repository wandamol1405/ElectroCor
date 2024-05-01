const express = require('express');
const { Model } = require('sequelize');
const addSaleOrder = require('../controller/saleOrderController');
const saleOrderRouter = express.Router();

saleOrderRouter.post("/", addSaleOrder);

module.exports = saleOrderRouter;