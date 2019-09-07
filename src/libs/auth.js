const libs = {};

// Middleware to ensure if the user is Authenticated
libs.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.previousURL = req.url;
    return res.redirect('/auth/signin');
};

libs.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.previousURL = req.url;
        return next();
    }
    return res.redirect('/user/profile');
};

module.exports = libs;