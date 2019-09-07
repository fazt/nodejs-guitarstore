const router = require('express').Router();

const cartController = require('../controllers/cart.controller');

const { isLoggedIn, isNotLoggedIn } = require('../libs/auth');

// Routes
router.use(isLoggedIn);

router.get('/add/:productId', cartController.addProduct);
router.get('/reduce/:id', cartController.reduceOneProduct);
router.get('/remove/:id', cartController.removeAllProduct);
router.get('/', cartController.renderShoppingCart);
router.post('/checkout', cartController.checkout);

router.use(isNotLoggedIn);

module.exports = router;