const productsCtrl = {};

const Product = require("../models/Product");

productsCtrl.renderProducts = async (req, res, next) => {
  const products = await Product.find().sort("-_id");
  if (products) {
    res.render("products/list", { products });
  }
};

productsCtrl.renderProduct = async (req, res) => {
  const { uri } = req.params;
  const product = await Product.findOne({ uri });
  console.log(product);
  if (product) {
    res.render("products/preview", { product });
  }
};

module.exports = productsCtrl;
