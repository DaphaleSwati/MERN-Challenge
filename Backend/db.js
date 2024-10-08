const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/product');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Could not connect to MongoDB', err);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
