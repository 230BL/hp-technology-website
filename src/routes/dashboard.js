const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { ensureAuth, ensureAdmin } = require('../middleware/authMiddleware');

// Dashboard Main Page
router.get('/', ensureAuth, ensureAdmin, dashboardController.getDashboard);

// Removed the other routes

module.exports = router;