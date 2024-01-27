const Product = require("../model/Product");

const addProducts = (req, res)=>{
    const product = req.body;
    Product.create(product);
    res.json({msg: "Producto agregado exitosamente"});
}

const getProducts = (req, res)=>{
    const products = Product.findAll();
    res.json({msg:"Productos", data: products});
}

const getProductById =(req, res)=>{
    const { id } = req.params;
    const product = Product.findById(id);
    res.json({msg:`Producto con id ${id}`, data: product});
}

const updateProduct =(req, res)=>{
    const {id}=req.params;
    const product = req.body;
    Product.updateProduct(id, product);
    res.json({msg:"Producto actualizado correctamente"});
}

const deleteProduct = (req,res)=>{
    const { id } = req.params;
    Product.removeProduct(id);
    res.json({msg: "Producto eliminado correctamente"}); 
}
module.exports = {addProducts, getProducts, getProductById, updateProduct, deleteProduct};