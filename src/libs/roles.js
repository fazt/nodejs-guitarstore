const helper = {};

helper.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin')
        return next();
    return res.redirect('/user/profile');
};

module.exports = helper;