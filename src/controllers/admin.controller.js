const indexCtrl = {};

// Model
const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

const { validationResult } = require('express-validator');
const fs = require('fs-extra');

// Controllers
indexCtrl.renderNewProductForm = (req, res) => {
    res.render('admin/products/add');
};

indexCtrl.saveNewProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = [];
        errors.array().forEach(error => messages.push(error.msg));
        req.flash('error', messages);
        return res.redirect('/admin/products/add');
    } else if (!req.file) {
        req.flash('error', 'Image is required');
        return res.redirect('/admin/products/add');
    }
    try {
        // Receive Frontend Data
        const { name, price, uri, description } = req.body;
        const newUri = !uri.trim() ? name.replace(/\s+/g, '-').toLowerCase() : uri;
        // Uploaded Image Information
        const imagePath = req.file.path;
        // Uploaded Image Information from Cloudinary
        const result = await cloudinary.upload(imagePath);
        // Creating a new Product Document for Mongodb
        const newProduct = new Product({
            name,
            uri: newUri,
            price,
            description,
            image: {
                path: result.secure_url,
                public_id: result.public_id
            }
        });
        // Saving the newProduct to the database
        await newProduct.save();
        // Deleting the Image from our Server
        await fs.unlink(imagePath);
        // Send Response to the Client
        res.redirect('/admin/products');
    }
    catch (e) {
        console.log(e)
    }
};

indexCtrl.renderProducts = async (req, res) => {
    const products = await Product.find();
    res.render('admin/products/list', { products });
};

indexCtrl.deleteProduct = async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    await cloudinary.delete(product.image.public_id);
    res.redirect('/admin/products');
};

module.exports = indexCtrl;