const router = require('express').Router();
const passport = require('passport');

// Model
const Product = require('../models/Product');

// Middlewares
const csrf = require('csurf');
const csrfProtection = csrf();
router.use(csrfProtection);

// Routes
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.render('index', { products });
});

router.route('/user/signup')
    .get((req, res, next) => {
        res.render('auth/signup', {
            csrfToken: req.csrfToken()
        });
    })
    .post(passport.authenticate('local-signup', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/signup',
        failureFlash: true
    }));

router.get('/user/profile', (req, res, next) => {
    res.render('auth/profile');
});

module.exports = router;