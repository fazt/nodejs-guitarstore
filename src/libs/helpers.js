const helpers = {};

helpers.fromCentsToDollars = (cents) => cents * 100;

helpers.ifCond = (v1, v2, options) => {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
};

module.exports = helpers;