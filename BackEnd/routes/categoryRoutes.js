const express = require('express');
const getCategorys = require('../controller/categorysController');
const categoryRouter = express.Router();

categoryRouter.get("/", getCategorys);

module.exports = categoryRouter;
