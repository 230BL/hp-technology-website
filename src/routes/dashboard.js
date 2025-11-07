const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { ensureAuth, ensureAdmin } = require('../middleware/authMiddleware');

// Dashboard Main Page
router.get('/', ensureAuth, ensureAdmin, dashboardController.getDashboard);

// --- ADD THIS ROUTE ---
// Support Tickets Page
router.get('/support-tickets', ensureAuth, ensureAdmin, dashboardController.getSupportTickets);

// Removed the other routes

module.exports = router;