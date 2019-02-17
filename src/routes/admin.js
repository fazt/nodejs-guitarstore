const router = require('express').Router();

// Controllers
const indexController = require('../controllers/index.controller');
const { isAdmin } = require('../libs/roles');

// Routes To Save a new Product
router.route('/products/add')
    .get(indexController.renderNewProductForm)
    .post(indexController.saveNewProduct);

router.route('/products')
    .all(isAdmin)
    .get(indexController.renderProducts)

router.route('/products/:productId/delete')
    .get(indexController.deleteProduct);

module.exports = router;