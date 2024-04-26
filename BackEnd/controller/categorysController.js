const Category = require("../models").Category;

const getCategorys = async (req, res)=>{
    const categorys = await Category.findAll();
    res.json({msg:"Categorias", data: categorys});
}

module.exports = getCategorys;