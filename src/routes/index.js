const router = require('express').Router();

// Model
const Product = require('../models/Product');

// Routes
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.render('index', { products });
});

module.exports = router;