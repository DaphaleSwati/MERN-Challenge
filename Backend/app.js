// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const chartRoutes = require('./routes/chart'); // Import your chart routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/product', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Use the routes for API requests
app.use('/api', chartRoutes); // Use the routes prefixed with /api

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
