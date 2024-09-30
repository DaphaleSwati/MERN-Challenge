const express = require('express');
const statisticsController = require('../controllers/statisticsController'); // Adjust the path as needed
const router = express.Router();

// Routes for statistics
router.get('/', statisticsController.getStatistics);
router.get('/pie', statisticsController.getPieChartData);
router.get('/bar', statisticsController.getBarChartData);

module.exports = router;
