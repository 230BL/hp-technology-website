// const passport = require('passport'); // REMOVED
const db = require('../config/db'); // ADDED

// @desc    Show Login Page
// @route   GET /auth/login
exports.getLogin = (req, res) => {
    // Check if user is already logged in
    if (req.session.user) {
        // If they are, send them to the dashboard
        return res.redirect('/dashboard');
    }
    
    // Get error message from session, if it exists
    const message = req.session.errorMessage;
    delete req.session.errorMessage; // Clear message after reading it

    res.render('auth/login', {
        message: message // Pass the message to the template
    });
};

// @desc    Process Login Form
// @route   POST /auth/login
exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find the user in the database
        // NOTE: This is insecure. For testing only.
        const sql = 'SELECT * FROM Users WHERE email = ? AND password = ?';
        const [users] = await db.query(sql, [email, password]);

        // 2. Check if a user was found
        if (users.length > 0) {
            const user = users[0];

            // 3. Store user in session
            // This is how we "log them in"
            req.session.user = user; 

            // 4. Redirect based on user type
            if (user.type === 'admin') {
                res.redirect('/dashboard');
            } else {
                res.redirect('/'); // Not an admin, send to homepage
            }
        } else {
            // 5. No user found, or password incorrect
            req.session.errorMessage = 'Invalid email or password';
            res.redirect('/auth/login');
        }
    } catch (err) {
        console.error('Login error:', err);
        req.session.errorMessage = 'A server error occurred';
        res.redirect('/auth/login');
    }
};

// @desc    Logout User
// @route   GET /logout
exports.getLogout = (req, res, next) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) { 
            return next(err); 
        }
        res.redirect('/');
    });
};