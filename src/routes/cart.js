const router = require('express').Router();

const cartController = require('../controllers/cart.controller');

const { isLoggedIn } = require('../libs/auth');

// Routes
router.get('/add/:productId', cartController.addProduct);

router.get('/reduce/:id', cartController.reduceOneProduct);

router.get('/remove/:id', cartController.removeAllProduct);

router.get('/', isLoggedIn, cartController.renderShoppingCart);

router.post('/checkout', isLoggedIn, cartController.checkout);

module.exports = router;