const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const Transaction = require('./models/Transaction');

const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/transactionsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => console.log('Failed to connect to MongoDB', err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/api/seed', async (req, res) => {
    try {
        const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
        const response = await axios.get(url);
        const transactions = response.data;

        // Clear the collection and insert new data
        await Transaction.deleteMany();
        await Transaction.insertMany(transactions);

        res.send('Database seeded successfully');
    } catch (error) {
        res.status(500).send('Error seeding database');
    }
});

app.get('/api/transactions', async (req, res) => {
    const { page = 1, perPage = 10, search = '' } = req.query;

    const query = {
        $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { price: { $regex: search, $options: 'i' } }
        ]
    };

    const transactions = await Transaction.find(query)
        .skip((page - 1) * perPage)
        .limit(Number(perPage));

    res.json(transactions);
});

app.get('/api/statistics', async (req, res) => {
    const { month } = req.query;

    const totalSale = await Transaction.aggregate([
        {
            $match: { dateOfSale: { $regex: `${month}`, $options: 'i' } }
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: '$price' },
                soldCount: { $sum: { $cond: ['$sold', 1, 0] } },
                unsoldCount: { $sum: { $cond: ['$sold', 0, 1] } }
            }
        }
    ]);

    res.json(totalSale[0] || { totalAmount: 0, soldCount: 0, unsoldCount: 0 });
});

app.get('/api/bar-chart', async (req, res) => {
    const { month } = req.query;

    const ranges = [
        { range: '0-100', min: 0, max: 100 },
        { range: '101-200', min: 101, max: 200 },
        // Add other ranges...
    ];

    const barChartData = await Promise.all(ranges.map(async (r) => {
        const count = await Transaction.countDocuments({
            price: { $gte: r.min, $lte: r.max },
            dateOfSale: { $regex: month, $options: 'i' }
        });
        return { range: r.range, count };
    }));

    res.json(barChartData);
});

app.get('/api/pie-chart', async (req, res) => {
    const { month } = req.query;

    const pieChartData = await Transaction.aggregate([
        {
            $match: { dateOfSale: { $regex: month, $options: 'i' } }
        },
        {
            $group: {
                _id: '$category',
                count: { $sum: 1 }
            }
        }
    ]);

    res.json(pieChartData);
});

