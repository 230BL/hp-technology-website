// in: src/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Show login page
router.get('/login', authController.getLogin);

// Process login form
router.post('/login', authController.postLogin);

// --- ADD THESE NEW ROUTES ---
// Show registration page
router.get('/register', authController.getRegister);

// Process registration form
router.post('/register', authController.postRegister);
// --- END OF NEW ROUTES ---

// Logout user
router.get('/logout', authController.getLogout);

module.exports = router;