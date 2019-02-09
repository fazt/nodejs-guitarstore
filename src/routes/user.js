const { Router } = require('express');
const router = Router();

const { isLoggedIn } = require('../libs/auth');

router.use('/', isLoggedIn, (req, res, next) => next());

router.get('/profile', (req, res, next) => {
    res.render('user/profile');
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;