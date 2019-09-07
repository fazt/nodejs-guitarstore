const { Router } = require('express');
const router = Router();

// Controllers
const adminController = require('../controllers/admin.controller');

// Middlewares
const { isLoggedIn, isNotLoggedIn } = require('../libs/auth');
const { isAdmin } = require('../libs/roles');

// Libraries
const multer = require('../config/multer');
const validator = require('../config/validator');

// Authorization
router.use(isLoggedIn);

// Routes To Manage Product
router.route('/products/add')
    .get(adminController.renderNewProductForm)
    .post(multer.single('image'), validator('createProduct'), adminController.saveNewProduct);

router.route('/products')
    .all(isAdmin)
    .get(adminController.renderProducts)

router.route('/products/:productId/delete')
    .get(adminController.deleteProduct);

module.exports = router;