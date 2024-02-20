const express = require('express');
const { addProducts, getProducts, getProductById, updateProduct, deleteProduct } = require('../controller/productsController');
const productValidator = require('../middlewares/productValidator');
const productsRouter = express.Router();

productsRouter.post("/", productValidator, addProducts);

productsRouter.get("/", getProducts);

productsRouter.get("/:id", getProductById);

productsRouter.put("/:id", updateProduct);

productsRouter.delete("/:id", deleteProduct);

module.exports = productsRouter;