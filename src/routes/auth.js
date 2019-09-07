const { Router } = require('express');
const router = Router();

const authCtrl = require('../controllers/auth.controller');
const validator = require('../config/validator');

const csrf = require('csurf');

router.use(csrf());

// Routes
router.get('/signup', authCtrl.renderSignUpForm);

router.post('/signup', validator('signUp'), authCtrl.postSignUp, (req, res) => {
    console.log('llego 3')
    if (req.session.previousURL) {
        const previousURL = req.session.previousURL;
        delete req.session.previousURL;
        return res.redirect(previousURL);
    }
    res.redirect('/user/profile')
 });

router.get('/signin',authCtrl.renderSignInForm);

router.post('/signin', validator('signIn'), authCtrl.postSignIn
// ], authCtrl.postSignIn, (req, res) => {
//     if (req.session.previousURL) {
//         const previousURL = req.session.previousURL;
//         delete req.session.previousURL;
//         return res.redirect(previousURL);
//     }
//     res.redirect('/user/profile')
);

router.get('/logout', authCtrl.logout);

module.exports = router;