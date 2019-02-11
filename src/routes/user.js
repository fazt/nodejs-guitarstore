const { Router } = require('express');
const router = Router();

const Order = require('../models/Order');
const Cart = require('../models/Cart');

const { isLoggedIn, isNotLoggedIn } = require('../libs/auth');

router.use('/', isLoggedIn, (req, res, next) => next());

router.get('/profile', isLoggedIn, async (req, res, next) => {
    const orders = await Order.find({ user: req.user });
    orders.forEach(order => {
        const cart = new Cart(order.cart);
        order.items = cart.array();
    })
    console.log({orders})
    res.render('user/profile', { orders });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

router.use(isNotLoggedIn)

module.exports = router;