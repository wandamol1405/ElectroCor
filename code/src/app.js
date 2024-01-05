const express = require('express');
const path = require('path');

// Crear una instancia de Express
const app = express();

// Puerto en el que escuchará el servidor
const PORT = 3000;

/**
 * Ruta para mostrar la página de registro de usuario.
 *
 * @name GET /usuario
 * @function
 * @memberof module:app
 * @inner
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
app.get("/usuario", (req, res) => {
    // Obtener la ruta del archivo HTML de registro
    const filePath = path.join(__dirname, 'public/register.html');

    // Enviar el archivo HTML como respuesta
    res.sendFile(filePath);
});

/**
 * Ruta para procesar la solicitud de registro de usuario.
 *
 * @name POST /usuario
 * @function
 * @memberof module:app
 * @inner
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
app.post("/usuario", (req, res) => {
    // Enviar mensaje de éxito después de registrar al usuario
    res.send("Te has registrado correctamente!");
});

/**
 * Ruta para procesar la solicitud de agregar productos al carrito.
 *
 * @name POST /productos
 * @function
 * @memberof module:app
 * @inner
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
app.post("/productos", (req, res) => {
    // Enviar mensaje de éxito después de agregar productos al carrito
    res.send("Productos agregados al carrito");
});

/**
 * Ruta para mostrar la página del carrito de compras.
 *
 * @name GET /productos
 * @function
 * @memberof module:app
 * @inner
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
app.get("/productos", (req, res) => {
    // Obtener la ruta del archivo HTML del carrito
    const filePath = path.join(__dirname, 'public/cart.html');

    // Enviar el archivo HTML como respuesta
    res.sendFile(filePath);
});

/**
 * Iniciar el servidor Express y escuchar en el puerto especificado.
 *
 * @name listen
 * @function
 * @memberof module:app
 * @inner
 * @param {number} PORT - Puerto en el que escuchará el servidor.
 * @param {Function} callback - Función de devolución de llamada que se ejecuta cuando el servidor se inicia.
 */
app.listen(PORT, () => {
    console.log('listening on port ', PORT);
});

