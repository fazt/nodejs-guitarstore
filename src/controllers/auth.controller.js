const authCtrl = {};

const passport = require('passport');
const { validationResult } = require('express-validator');

authCtrl.renderSignUpForm = (req, res, next) => {
    res.render('auth/signup', {
        csrfToken: req.csrfToken()
    });
};

authCtrl.postSignUp = (req, res, next) => {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = [];
        errors.array().forEach(error => messages.push(error.msg));
        req.flash('error', messages);
        return res.redirect('/auth/signup');
    }
    // Authentication
    return passport.authenticate('local-signup', {
        // successRedirect: '/user/profile',
        failureRedirect: '/auth/signup',
        failureFlash: true
    })(req, res, next);
};

authCtrl.renderSignInForm = (req, res, next) => {
    res.render('auth/signin', {
        csrfToken: req.csrfToken()
    });
};

authCtrl.postSignIn = (req, res, next) => {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = [];
        errors.array().forEach(error => messages.push(error.msg));
        req.flash('error', messages);
        return res.redirect('/auth/signin');
    }
    // authentication
    passport.authenticate('local-signin', {
        failureRedirect: '/auth/signin',
        successRedirect: '/user/profile',
        failureFlash: true
    })(req, res, next);
};

authCtrl.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
};

module.exports = authCtrl;