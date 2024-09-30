const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    dateOfSale: { type: Date, required: true },
    category: { type: String, required: true }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
