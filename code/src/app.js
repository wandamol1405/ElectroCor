const express = require('express');
const path = require('path');
const send = require('send');
const app = express();
const PORT = 3000;

app.get("/usuario", (req, res)=>{
    const filePath = path.join(__dirname, 'public/register.html');
    res.sendFile(filePath);
})
app.post("/usuario", (req, res)=>{
    res.send("Te has registrado correctamente!");
})
app.post("/productos", (req, res)=>{
    res.send("Productos agregados al carrito")
})
app.get("/productos", (req, res)=>{
    const filePath = path.join(__dirname, 'public/cart.html');
    res.sendFile(filePath);
})
app.listen(PORT, ()=>{console.log('listening on port ', PORT)});