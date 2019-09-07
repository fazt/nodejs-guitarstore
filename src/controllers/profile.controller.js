const profileCtrl = {};

const Order = require('../models/Order');
const Cart = require('../models/Cart');

profileCtrl.renderProfile = async (req, res, next) => {
    const orders = await Order.find({ user: req.user });
    orders.forEach(order => {
        const cart = new Cart(order.cart);
        order.items = cart.array();
    })
    res.render('user/profile', { orders });
}

module.exports = profileCtrl;