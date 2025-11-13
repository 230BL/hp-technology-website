const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// --- Database & Auth Setup ---
// We will use express-session
const session = require('express-session');
// const passport = require('passport'); // REMOVED
const db = require('./src/config/db');

// --- Route Definitions ---
const clientRoutes = require('./src/routes/client');
const dashboardRoutes = require('./src/routes/dashboard');
const authRoutes = require('./src/routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- ADD SESSION MIDDLEWARE ---
// This must come BEFORE you mount the routes
app.use(session({
    secret: 'a-simple-secret-for-testing', // Change this to a random string
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

// --- THIS IS THE NEW MIDDLEWARE TO FIX THE PROBLEM ---
// Makes user data available to all templates
app.use((req, res, next) => {
    // res.locals makes this variable available in all EJS templates
    res.locals.user = req.session.user || null;
    next();
});
// ----------------------------------------------------


// --- MOUNT THE ROUTES ---
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes); 
app.use('/', clientRoutes);             

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});