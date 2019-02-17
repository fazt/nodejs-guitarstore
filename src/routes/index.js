const router = require('express').Router();

// Controller
const productsController = require('../controllers/products.controller');

// Routes
router.get('/', productsController.renderProductsView);

module.exports = router;