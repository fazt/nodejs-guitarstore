const router = require('express').Router();

// Model
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { isLoggedIn } = require('../libs/auth');

// Routes
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.render('index', { products });
});

router.get('/cart/add/:productId', async (req, res) => {
    const { productId } = req.params;
    // Setting the Cart, with old items or new Items
    const cart = new Cart(req.session.cart);
    // Get Product's data
    const product = await Product.findById(productId);
    cart.addItem(product, product._id);
    // Save the Cart in session
    req.session.cart = cart;
    // Respond to the Client 
    res.redirect('/');
});

router.get('/cart/reduce/:id', (req, res, next) => {
    const { id } = req.params;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(id);
    req.session.cart = cart;
    res.redirect('/cart');
});

router.get('/cart/remove/:id', (req, res, next) => {
    const { id } = req.params;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(id);
    req.session.cart = cart;
    res.redirect('/cart');
});

router.get('/cart', isLoggedIn, (req, res) => {
    let products = [];
    let cart = {};

    if (!req.session.cart) {
        products = null;
    } else {
        cart = new Cart(req.session.cart);
        products = cart.array();
    }
    res.render('cart/list', { products, totalPrice: cart.totalPrice })
});

router.post('/checkout', isLoggedIn, async (req, res, next) => {
    if (!req.session.cart) {
        return res.redirect('/cart');
    }
    const cart = new Cart(req.session.cart);


    stripe.charges.create({
        amount: cart.totalPrice * 100, //cents of currency
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Charge for " + req.body.stripeEmail
    }, async function (err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/cart');
        }
        const order = new Order({
            user: req.user,
            cart,
            address: req.body.address,
            name: req.body.firstname,
            paymentId: charge.id
        });
        await order.save();
        req.flash('success', 'You buy your Product successfully');
        delete req.session.cart;
        return res.redirect('/');
    });
});

module.exports = router;