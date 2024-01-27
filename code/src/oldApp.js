const express = require("express");
const path = require("path");

// Crear una instancia de Express
const app = express();

// Puerto en el que escuchará el servidor
const PORT = 3000;

/**
 * Middleware para manejar datos JSON en las solicitudes.
 * @name express.json
 * @function
 * @memberof module:app
 * @inner
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función que llama al siguiente middleware.
 */
app.use(express.json());

/**
 * Middleware para manejar datos codificados en la URL en las solicitudes.
 * @name express.urlencoded
 * @function
 * @memberof module:app
 * @inner
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función que llama al siguiente middleware.
 */
app.use(express.urlencoded({extended: true}));

/**
 * Representa una lista de productos disponibles.
 * @typedef {Object} Product
 * @property {number} id - Identificador único del producto.
 * @property {string} name - Nombre del producto.
 * @property {number} price - Precio del producto.
 */

/** @type {Product[]} */
const products = [
  {
    id: 1,
    name: "Kit Arduino",
    price: 40000
  },
  {
    id: 2,
    name: "Multímetro Crossmaster",
    price: 10510
  },
  {
    id: 3,
    name: "Kit 100 Resistencias",
    price: 4840
  },
  {
    id: 4,
    name: "Probador Tiras Led",
    price: 36290
  },
  { 
    id: 5,
    name: "Filamento ECOFILA PLA",
    price: 7188
  }
];

/**
 * Maneja la solicitud de registro de usuario.
 * @name POST/users
 * @function
 * @memberof module:app
 * @inner
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
app.post("/users", (req, res) => {
  // Respuesta JSON para la solicitud de registro de usuario exitosa
  res.json({ msg: "Successful user registration" });
});

/**
 * Maneja la solicitud de agregar un nuevo producto.
 * @name POST/products
 * @function
 * @memberof module:app
 * @inner
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
app.post("/products", (req, res) => {
  // Respuesta JSON para la solicitud de agregar producto exitosamente
  res.json({ msg: "Product aggregated correctly" });
});

/**
 * Maneja la solicitud de obtener la lista de productos.
 * @name GET/products
 * @function
 * @memberof module:app
 * @inner
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
app.get("/products", (req, res)=>{
    // Respuesta JSON con la lista de productos
    res.json({msg: "products obtained correctly", data: products});
});

/**
 * Inicia el servidor Express y escucha en el puerto especificado.
 *
 * @name listen
 * @function
 * @memberof module:app
 * @inner
 * @param {number} PORT - Puerto en el que escuchará el servidor.
 * @param {Function} callback - Función de devolución de llamada que se ejecuta cuando el servidor se inicia.
 */
app.listen(PORT, () => {
  // Mensaje de consola indicando que el servidor está escuchando en el puerto especificado
  console.log("listening on port ", PORT);
});
