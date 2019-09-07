const passport = require('passport');
const User = require('../models/User');

const LocalStrategy = require('passport-local').Strategy;
const { validationResult } = require('express-validator');

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
    // Validation a Unique User Email 
    const userFound = await User.findOne({ email: email });
    if (userFound) {
        return done(null, false, { message: 'Email is already in Use.' });
    }

    // Creating a new User
    const newUser = new User();
    newUser.email = email;
    newUser.password = await newUser.encryptPassword(password);

    // Saving the new user
    await newUser.save();

    return done(null, newUser);
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({email});
    if (!user) {
        return done(null, false, {message: "The User Don't exists"});
    } else if (!await user.matchPassword(password)) {
        return done(null, false, {message: 'Incorrect Password'});
    }
    return done(null, user);
}));

