const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Import the Product model

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from the MongoDB collection
        res.json(products); // Send the fetched products as a response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); // Fetch product by ID
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product); // Send the fetched product as a response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
