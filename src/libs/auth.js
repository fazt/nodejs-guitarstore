const libs = {};

// Middleware to ensure if the user is Authenticated
libs.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/signin');
};

module.exports = libs;