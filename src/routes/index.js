const { Router } = require('express');
const router = Router();

// Controller
const productsController = require('../controllers/products.controller');

// Routes
router.get('/', productsController.renderProductsView);
router.get('/product/:uri', productsController.renderProductPreview);

module.exports = router;