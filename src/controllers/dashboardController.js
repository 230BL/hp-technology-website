// Import the database connection pool
const db = require('../config/db');

// @desc    Get dashboard
// @route   GET /dashboard
exports.getDashboard = async (req, res) => {
    try {
        // 1. Create the SQL query
        const sql = 'SELECT id, name, email, type FROM Users';
        
        // 2. Execute the query
        const [users] = await db.query(sql);

        // 3. Render the dashboard and pass the users data to the template
        res.render('dashboard/index', {
            user: req.user, // This passes the currently logged-in user (from auth)
            users: users    // This passes the list of all users for the table
        });
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Server Error');
    }
};

// Removed the other controller functions