// Import the database connection pool
const db = require('../config/db');

// @desc    Get dashboard
// @route   GET /dashboard
exports.getDashboard = async (req, res) => {
    try {
        // 1. Fetch all users from the database
        const [users] = await db.query('SELECT id, name, email, type FROM Users');
        
        // 2. Render the dashboard and pass the users data to the template
        res.render('dashboard/index', {
            user: req.session.user, 
            users: users, // Now the 'users' variable exists
            title: 'Dashboard'
        });

    } catch (err) {
        // 3. IMPORTANT: Handle any errors
        console.error('Dashboard Error:', err);
        res.status(500).send('Server Error');
    }
};

// @desc    Get Support Tickets page
// @route   GET /dashboard/support-tickets
exports.getSupportTickets = (req, res) => {
    try {
        // Just render the page
        res.render('dashboard/support-tickets', {
            user: req.session.user, // Pass the user for the header
            title: 'Support Tickets'
        });
    } catch (err) {
        console.error('Support Tickets Error:', err);
        res.status(500).send('Server Error');
    }
};