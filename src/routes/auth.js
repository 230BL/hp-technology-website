// in: src/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Add a placeholder route to make this file valid
// We will build this out later
router.get('/login', authController.getLoginPage);

module.exports = router;