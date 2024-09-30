const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Get data for Bar Chart
router.get('/bar-chart', async (req, res) => {
    const month = req.query.month || 'March'; // Use a default value
    try {
        const data = await Transaction.aggregate([
            {
                $match: {
                    // Assuming you have a date field to filter by month
                    date: { $regex: new RegExp(month, 'i') } // Adjust accordingly
                }
            },
            {
                $group: {
                    _id: { $substr: ['$date', 0, 7] }, // Group by month
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(data);
    } catch (error) {
        console.error("Error fetching bar chart data:", error);
        res.status(500).json({ message: 'Error fetching bar chart data' });
    }
});

// Get data for Pie Chart
router.get('/pie-chart', async (req, res) => {
    const month = req.query.month || 'March'; // Use a default value
    try {
        const data = await Transaction.aggregate([
            {
                $match: {
                    // Assuming you have a date field to filter by month
                    date: { $regex: new RegExp(month, 'i') } // Adjust accordingly
                }
            },
            {
                $group: {
                    _id: '$category', // Adjust according to your schema
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(data);
    } catch (error) {
        console.error("Error fetching pie chart data:", error);
        res.status(500).json({ message: 'Error fetching pie chart data' });
    }
});

module.exports = router;
