// const passport = require('passport'); // REMOVED
const db = require('../config/db'); // ADDED
const bcrypt = require('bcryptjs'); 

// @desc    Show Login Page
// @route   GET /auth/login
exports.getLogin = (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    const message = req.session.message;
    delete req.session.message; 
    res.render('auth/login', {
        message: message
    });
};

// @desc    Show Registration Page
// @route   GET /auth/register
exports.getRegister = (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    const message = req.session.errorMessage;
    delete req.session.errorMessage; 
    res.render('auth/register', {
        message: message 
    });
};


// @desc    Process Login Form
// @route   POST /auth/login
exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find the user by email
        const sql = 'SELECT * FROM Users WHERE email = ?';
        const [users] = await db.query(sql, [email]);

        // 2. Check if a user was found
        if (users.length === 0) {
            req.session.message = 'Invalid email or password';
            return res.redirect('/auth/login');
        }

        const user = users[0];

        // 3. Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // 4. Passwords match - Store user in session
            req.session.user = user; 

            // 5. Redirect based on user type
            if (user.type === 'admin') {
                res.redirect('/dashboard');
            } else {
                res.redirect('/'); 
            }
        } else {
            // 6. Passwords do not match
            req.session.message = 'Invalid email or password';
            res.redirect('/auth/login');
        }
    } catch (err) {
        console.error('Login error:', err);
        req.session.message = 'A server error occurred';
        res.redirect('/auth/login');
    }
};


// --- UPDATED THIS FUNCTION ---
// @desc    Process Registration Form
// @route   POST /auth/register
exports.postRegister = async (req, res) => {
    try {
        // 1. Get name, email, and passwords from form
        const { name, email, password, passwordConfirm } = req.body;

        // 2. Check if passwords match
        if (password !== passwordConfirm) {
            req.session.errorMessage = 'Passwords do not match';
            return res.redirect('/auth/register');
        }

        // 3. Check if user already exists
        const checkSql = 'SELECT * FROM Users WHERE email = ?';
        const [existingUsers] = await db.query(checkSql, [email]);

        if (existingUsers.length > 0) {
            req.session.errorMessage = 'An account with that email already exists';
            return res.redirect('/auth/register');
        }

        // 4. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. Insert new user into database with name, email, hashed password, and type 'user'
        const insertSql = 'INSERT INTO Users (name, email, password, type) VALUES (?, ?, ?, ?)';
        await db.query(insertSql, [name, email, hashedPassword, 'user']);

        // 6. Redirect to login page with a success message
        req.session.message = 'Registration successful! Please log in.';
        res.redirect('/auth/login');

    } catch (err) {
        console.error('Registration error:', err);
        req.session.errorMessage = 'A server error occurred';
        res.redirect('/auth/register');
    }
};
// --- END OF UPDATED FUNCTION ---


// @desc    Logout User
// @route   GET /logout
exports.getLogout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) { 
            return next(err); 
        }
        res.redirect('/');
    });
};