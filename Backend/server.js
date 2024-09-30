const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db'); // Import your DB connection
const chartRoutes = require('./routes/chart');

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api', chartRoutes); // Use your chart routes

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
