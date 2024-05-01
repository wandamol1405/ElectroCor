const SaleOrder = require("../models").SaleOrder;
const DetailOrder = require("../models").DetailOrder;

const addSaleOrder = async (req, res) => {
    const { id_user, date_order, total_order, products } = req.body;
  
    const order = await SaleOrder.create({ id_user, date_order, total_order });
    const id_order = order.id_order;
  
    const detailPromises = products.map(async (product) => {
      const { id_product, quantity, price } = product;
      const amount = quantity;
      const sale_price = quantity*price;
      await DetailOrder.create({ id_order, id_product, amount, sale_price });
    });
  
    await Promise.all(detailPromises);
  
    res.json({ msg: "Compra agregada exitosamente" });
  };
  
  module.exports = addSaleOrder;
  