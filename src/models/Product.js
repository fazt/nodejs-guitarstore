const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imagePath: {type: String, required: true},
    created_at: {type: Date, default: new Date()}
});

module.exports = model('Product', ProductSchema);