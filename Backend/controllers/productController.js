// backend/controllers/productController.js
const Product = require('../models/Product');

// Get all products with search and pagination
const getAllProducts = async (req, res) => {
    const { page = 1, perPage = 1, search = '' } = req.query;
    
    try {
        const query = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: { $regex: search, $options: 'i' } },
            ],
        };

        const products = await Product.find(query)
            .limit(perPage)
            .skip((page - 1) * perPage);

        const totalProducts = await Product.countDocuments(query);

        res.json({
            products,
            total: totalProducts,
            page,
            perPage,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    const productData = req.body;

    const product = new Product(productData);
    try {
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Other CRUD operations (update, delete) can be added similarly...

module.exports = {
    getAllProducts,
    createProduct,
    // Add other exports for update and delete
};
