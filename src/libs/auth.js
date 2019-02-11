const libs = {};

// Middleware to ensure if the user is Authenticated
libs.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.previousURL = req.url;
    res.redirect('/auth/signin');
};

libs.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // req.session.previousURL = req.url;
        return next();
    }
    res.redirect('/user/profile');
};

module.exports = libs;