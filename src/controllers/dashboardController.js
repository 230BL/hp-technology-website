// Import the database connection pool
const db = require('../config/db');

// @desc    Get dashboard
// @route   GET /dashboard
exports.getDashboard = async (req, res) => {
    try {
        // ... (your existing getDashboard code is here)
        
        // 3. Render the dashboard and pass the users data to the template
        res.render('dashboard/index', {
            user: req.session.user, 
            users: users,
            title: 'Dashboard' // Optional: Pass a title
        });
    } catch (err) {
        // ... (your existing error handling)
    }
};

// --- ADD THIS NEW FUNCTION ---
// @desc    Get Support Tickets page
// @route   GET /dashboard/support-tickets
exports.getSupportTickets = (req, res) => {
    try {
        // Just render the page
        res.render('dashboard/support-tickets', {
            user: req.session.user, // Pass the user for the header
            title: 'Support Tickets' // Optional: Pass a title
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Server Error');
    }
};