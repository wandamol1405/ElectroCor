const { readFileJSON, writeFileJSON } = require(".");
const { uuid } =require("uuidv4");
const dbFile ="products.json";

const Product = {
    create: function (producto){
        const productos = readFileJSON(dbFile);
        productos.push({
            id: uuid(),
            ...producto
        });
        writeFileJSON(dbFile, productos);
    },
    findAll: function(){
        return readFileJSON(dbFile);
    },
    findById: function(id){
        const productos = readFileJSON(dbFile);
        const producto = productos.find((product)=> product.id === id);
        return producto;
    },
    updateProduct: function(id, product){
        const productos = readFileJSON(dbFile);
        const indexProducto = productos.findIndex((product)=> product.id === id);
        productos[indexProducto]={
            ...productos[indexProducto],
            ...product
        }
        writeFileJSON(dbFile, productos);
    },
    removeProduct: function(id){
        const productos = readFileJSON(dbFile);
        const indexProducto = productos.findIndex((product)=>product.id === id);
        productos.splice(indexProducto, 1);
        writeFileJSON(dbFile, productos);
    }
}

module.exports = Product;