const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
// We will add protection here
const { isEmployee } = require('../middleware/authMiddleware');

// Dashboard Home (e.g., /dashboard)
// We will add 'isEmployee' middleware here to protect it
router.get('/', dashboardController.getDashboardHome);

// Manage Products Page (e.g., /dashboard/products)
router.get('/products', dashboardController.getProductsPage);

module.exports = router;