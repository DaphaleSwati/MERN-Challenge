const Product = require('../models/Product');

// Month mapping
const monthNames = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11
};

exports.getStatistics = async (req, res) => {
    console.log("getStatistics called");
    let month = req.query.month?.trim();
    console.log("Received month:", month);
    
    if (!month || !monthNames.hasOwnProperty(month)) {
        return res.status(400).json({ message: "Invalid month provided." });
    }

    try {
        // Calculate start and end dates
        const year = new Date().getFullYear();
        const startDate = new Date(year, monthNames[month], 1); // First day of the month
        const endDate = new Date(year, monthNames[month] + 1, 0); // Last day of the month
        
        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);

        // Find products sold in the specified month
        // Find products sold in the specified month
const productsInMonth = await Product.find({
    dateOfSale: {
        $gte: startDate,
        $lte: endDate // Ensure to use $lte
    }
});


        console.log("Products in Month:", productsInMonth);

        // Calculate statistics
        const totalAmount = productsInMonth.reduce((sum, product) => sum + product.price, 0);
        const totalSoldItems = productsInMonth.length; // Count of sold items
        const totalNotSoldItems = productsInMonth.filter(product => product.stock === 0).length; // Count of unsold items

        // Send response
        res.json({
            totalAmount,
            totalSoldItems,
            totalNotSoldItems,
            products: productsInMonth // Return all products sold in the month
        });
    } catch (error) {
        console.error("Error fetching statistics:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get data for pie chart
exports.getPieChartData = async (req, res) => {
    const month = req.query.month?.trim();
    
    if (!month || !monthNames.hasOwnProperty(month)) {
        return res.status(400).json({ message: "Invalid month provided." });
    }

    try {
        const year = new Date().getFullYear();
        const startDate = new Date(year, monthNames[month], 1);
        const endDate = new Date(year, monthNames[month] + 1, 0, 23, 59, 59, 999);
        
        const pieChartData = await Product.aggregate([
            {
                $match: {
                    dateOfSale: {
                        $gte: startDate,
                        $lt: endDate
                    }
                }
            },
            {
                $group: {
                    _id: "$category", // Grouping by category
                    totalItems: { $sum: 1 } // Counting items in each category
                }
            },
            {
                $project: {
                    category: "$_id",
                    totalItems: 1
                }
            }
        ]);

        res.json(pieChartData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get data for bar chart
exports.getBarChartData = async (req, res) => {
    const month = req.query.month?.trim();
    
    if (!month || !monthNames.hasOwnProperty(month)) {
        return res.status(400).json({ message: "Invalid month provided." });
    }

    try {
        const year = new Date().getFullYear();
        const startDate = new Date(year, monthNames[month], 1);
        const endDate = new Date(year, monthNames[month] + 1, 0, 23, 59, 59, 999);
        
        const barChartData = await Product.aggregate([
            {
                $match: {
                    dateOfSale: {
                        $gte: startDate,
                        $lt: endDate
                    }
                }
            },
            {
                $bucket: {
                    groupBy: "$price", // Group by price
                    boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000], // Define ranges
                    default: "901-above", // Group for values above the last boundary
                    output: {
                        totalItems: { $sum: 1 } // Count items in each range
                    }
                }
            }
        ]);

        res.json(barChartData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
