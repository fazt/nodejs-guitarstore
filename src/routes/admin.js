const router = require('express').Router();

// Controllers
const indexController = require('../controllers/index.controller');

// /admin

// Routes To Save a new Product
router.route('/products/add')
    .get(indexController.renderNewProductForm)
    .post(indexController.saveNewProduct);

router.route('/products')
    .get(indexController.renderProducts)

router.route('/products/:productId/delete')
    .get(indexController.deleteProduct);

module.exports = router;