// in: src/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Show login page
router.get('/login', authController.getLogin);

// Process login form
router.post('/login', authController.postLogin);

// Logout user
router.get('/logout', authController.getLogout);

module.exports = router;