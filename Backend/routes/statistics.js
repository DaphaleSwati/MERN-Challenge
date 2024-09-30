// routes/statistics.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Example statistics endpoint
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products
        const statistics = {
            totalProducts: products.length,
            inStock: products.filter(product => product.stock > 0).length,
            outOfStock: products.filter(product => product.stock === 0).length
        };
        res.json(statistics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
