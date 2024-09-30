const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    dateOfSale: String,
    sold: Boolean,
    category: String
});

module.exports = mongoose.model('Transaction', transactionSchema);
