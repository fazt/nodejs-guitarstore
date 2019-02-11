const { Router } = require('express');
const router = Router();

const passport = require('passport');
const { check } = require('express-validator/check');

// Middlewares
const csrf = require('csurf');
const csrfProtection = csrf();
router.use(csrfProtection);

// Routes
router.get('/signup', (req, res, next) => {
    res.render('auth/signup', {
        csrfToken: req.csrfToken()
    });
});

router.post('/signup', [
    check('email').not().isEmpty().isEmail().withMessage('Invalid Email'),
    check('password').isLength({ min: 4 }).withMessage('Invalid Password')
], passport.authenticate('local-signup', {
    failureRedirect: '/auth/signup',
    failureFlash: true
}), (req, res) => {
    if (req.session.previousURL) {
        const previousURL = req.session.previousURL;
        delete req.session.previousURL;
        return res.redirect(previousURL);
    }
    res.redirect('/user/profile')
});

router.get('/signin', (req, res, next) => {
    res.render('auth/signin', {
        csrfToken: req.csrfToken()
    });
});

router.post('/signin', [
    check('email').not().isEmpty().isEmail().withMessage('Invalid Email'),
    check('password').isLength({ min: 4 }).withMessage('Invalid Password')
], passport.authenticate('local-signin', {
    failureRedirect: '/auth/signin',
    failureFlash: true
}), (req, res) => {
    if (req.session.previousURL) {
        const previousURL = req.session.previousURL;
        delete req.session.previousURL;
        return res.redirect(previousURL);
    }
    res.redirect('/user/profile')
});

module.exports = router;