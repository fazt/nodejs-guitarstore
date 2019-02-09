const passport = require('passport');
const User = require('../models/User');

const LocalStrategy = require('passport-local').Strategy;
const { validationResult } = require('express-validator/check');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = [];
        errors.array().forEach(error => messages.push(error.msg));
        return done(null, false, req.flash('error', messages));
    }

    // Validation a Unique User Email 
    const userFound = await User.findOne({ email: email });
    if (userFound) {
        return done(null, false, { message: 'Email is already in Use.' });
    }

    // Creating a new User
    const newUser = new User();
    newUser.email = email;
    newUser.password = await newUser.encryptPassword(password);

    // Saving the new uSER
    await newUser.save();

    return done(null, newUser);
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array())
        const messages = [];
        errors.array().forEach(error => messages.push(error.msg));
        return done(null, false, req.flash('error', messages));
    }

    const user = await User.findOne({email});
    if (!user) {
        return done(null, false, {message: "The User Don't exists"});
    }
    if (!await user.matchPassword(password)) {
        return done(null, false, {message: 'Password Does not Match'});
    }
    return done(null, user);

}));

