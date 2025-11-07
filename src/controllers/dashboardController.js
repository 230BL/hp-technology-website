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
            users: users, 
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
exports.getSupportTickets = async (req, res) => {
    try {
        // 1. Fetch all tickets from the database, newest first
        const [tickets] = await db.query('SELECT * FROM SupportTickets ORDER BY created_at DESC');

        // 2. Render the page and pass the tickets data
        res.render('dashboard/support-tickets', {
            user: req.session.user, // Pass the user for the header
            title: 'Support Tickets',
            tickets: tickets // Pass the fetched tickets
        });
    } catch (err) {
        console.error('Support Tickets Error:', err);
        res.status(500).send('Server Error');
    }
};

// @desc    Update support ticket status
// @route   POST /dashboard/tickets/update-status/:id
exports.updateSupportTicketStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).send('Status is required.');
        }

        // Update the status in the database
        const sql = 'UPDATE SupportTickets SET status = ? WHERE id = ?';
        await db.query(sql, [status, id]);

        // Redirect back to the support tickets page
        res.redirect('/dashboard/support-tickets');

    } catch (err) {
        console.error('Update Ticket Status Error:', err);
        res.status(500).send('Server Error');
    }
};


// --- ADD THIS NEW FUNCTION FOR UPDATING USER ROLE ---
// @desc    Update user role
// @route   POST /dashboard/users/update-role/:id
exports.updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.body; // 'admin' or 'user'

        // Safety check: Prevent admin from changing their own role
        if (req.session.user.id == id) {
            console.log('Admin tried to change their own role');
            // You can add a flash message here later
            return res.redirect('/dashboard');
        }

        // Validate the 'type'
        if (!type || (type !== 'admin' && type !== 'user')) {
            return res.status(400).send('Invalid user type.');
        }

        // Update the user type in the database
        const sql = 'UPDATE Users SET type = ? WHERE id = ?';
        await db.query(sql, [type, id]);

        // Redirect back to the main dashboard
        res.redirect('/dashboard');

    } catch (err) {
        console.error('Update User Role Error:', err);
        res.status(500).send('Server Error');
    }
};

// --- ADD THIS NEW FUNCTION FOR DELETING A USER ---
// @desc    Delete user
// @route   POST /dashboard/users/delete/:id
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Safety check: Prevent admin from deleting themselves
        if (req.session.user.id == id) {
            console.log('Admin tried to delete themselves');
            // You can add a flash message here later
            return res.redirect('/dashboard');
        }

        // Delete the user from the database
        // Note: You may want to add logic to delete related data (e.g., their tickets)
        const sql = 'DELETE FROM Users WHERE id = ?';
        await db.query(sql, [id]);

        // Redirect back to the main dashboard
        res.redirect('/dashboard');

    } catch (err) {
        console.error('Delete User Error:', err);
        res.status(500).send('Server Error');
    }
};