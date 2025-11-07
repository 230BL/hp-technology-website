const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// --- Database & Auth Setup (Simplified for now) ---
// (We will add session/passport setup here later)
// const session = require('express-session');
// const passport = require('passport');
const db = require('./src/config/db');

// --- Route Definitions ---
const clientRoutes = require('./src/routes/client');
const dashboardRoutes = require('./src/routes/dashboard');
const authRoutes = require('./src/routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Serve static files (CSS, images) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// (Session & Passport middleware would go here)


// --- MOUNT THE ROUTES ---
// This is the core of the architecture
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes); // All dashboard routes are prefixed with /dashboard
app.use('/', clientRoutes);             // All client routes are at the root

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});