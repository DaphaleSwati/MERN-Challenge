// backend/controllers/seedController.js
const Product = require('../models/Product');
const axios = require('axios');

exports.seedDatabase = async (req, res) => {
    try {
        // Fetching data from the third-party API
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const products = response.data;

        // Here, ensure you process the data to match your schema
        await Product.deleteMany({}); // Clear existing products
        await Product.insertMany(products); // Insert new products

        res.status(200).json({ message: 'Database seeded successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error seeding the database.' });
    }
};
