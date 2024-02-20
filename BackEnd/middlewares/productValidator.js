const { body } = require('express-validator');

const productValidator = [
    body("name").notEmpty().isString().withMessage("Nombre del producto invalido"),
    body("price").notEmpty().isNumeric().withMessage("Precio del producto invalido")
]

module.exports = productValidator;
