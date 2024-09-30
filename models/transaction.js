const axios = require('axios');
const mongoose = require('mongoose');
const Transaction = require('./models/transaction'); // MongoDB model

const initData = async () => {
    const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
    const response = await axios.get(url);
    const transactions = response.data;

    // Clear the collection and initialize the database
    await Transaction.deleteMany();
    await Transaction.insertMany(transactions);

    console.log('Database seeded');
};

initData();
