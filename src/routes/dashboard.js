const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { ensureAuth, ensureAdmin } = require('../middleware/authMiddleware');

// Dashboard Main Page
router.get('/', ensureAuth, ensureAdmin, dashboardController.getDashboard);

// Support Tickets Page
router.get('/support-tickets', ensureAuth, ensureAdmin, dashboardController.getSupportTickets);

// --- ADD THIS ROUTE FOR UPDATING TICKET STATUS ---
router.post('/tickets/update-status/:id', ensureAuth, ensureAdmin, dashboardController.updateSupportTicketStatus);

// Removed the other routes

module.exports = router;