const productsCtrl = {};

const Product = require('../models/Product');

productsCtrl.renderProductsView = async (req, res, next) => {
    const products = await Product.find().sort('-_id');
    if (products) {
        res.render('products/list', { products });
    }
};

productsCtrl.renderProductPreview = async (req, res) => {
    const { uri } = req.params;
    const product = await Product.findOne({ uri });
    console.log(product)
    if (product) {
        res.render('products/preview', { product })
    }
}

module.exports = productsCtrl;