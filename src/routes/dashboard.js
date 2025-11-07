const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { ensureAuth, ensureAdmin } = require('../middleware/authMiddleware');

// Dashboard Main Page
router.get('/', ensureAuth, ensureAdmin, dashboardController.getDashboard);

// Support Tickets Page
router.get('/support-tickets', ensureAuth, ensureAdmin, dashboardController.getSupportTickets);

// Update Ticket Status
router.post('/tickets/update-status/:id', ensureAuth, ensureAdmin, dashboardController.updateSupportTicketStatus);

// --- ADD THESE ROUTES FOR USER MANAGEMENT ---

// @desc    Update user role
// @route   POST /dashboard/users/update-role/:id
router.post('/users/update-role/:id', ensureAuth, ensureAdmin, dashboardController.updateUserRole);

// @desc    Delete user
// @route   POST /dashboard/users/delete/:id
router.post('/users/delete/:id', ensureAuth, ensureAdmin, dashboardController.deleteUser);


module.exports = router;