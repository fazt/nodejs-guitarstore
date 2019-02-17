const productsCtrl = {};

const Product = require('../models/Product');

productsCtrl.renderProductsView = async (req, res, next) => {
    const products = await Product.find();
    res.render('index', { products });
};

module.exports = productsCtrl;