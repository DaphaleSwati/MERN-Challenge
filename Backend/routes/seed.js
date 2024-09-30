const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const productsData = require('../data/products.json'); // Ensure this path is correct

// Seed the product data into MongoDB
router.get('/', async (req, res) => {
    try {
        await Product.insertMany(productsData); // Insert products into MongoDB
        res.json({ message: 'Products data seeded successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
