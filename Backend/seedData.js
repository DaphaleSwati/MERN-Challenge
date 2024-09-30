// backend/seedData.js
const axios = require('axios');
const Product = require('./models/Product');

const seedDatabase = async () => {
    try {
        // Fetch data from the provided API URL
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const products = response.data;

        // Log the fetched data (for debugging)
        console.log('Fetched data:', products);

        // Check if products are available
        if (!products || products.length === 0) {
            throw new Error('No products fetched from the API');
        }

        // Clear existing data
        await Product.deleteMany();

        // Insert new data
        const result = await Product.insertMany(products);
        console.log(`${result.length} products inserted into the database`);
    } catch (err) {
        console.error('Error seeding database:', err.message);
    }
};

module.exports = seedDatabase;
