const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Homepage
router.get('/', clientController.getHomepage);

// Services Page (e.g., "Formation & Accompagnement")
router.get('/services', clientController.getServicesPage);

// Contact Page (e.g., for "Assistance Technique" requests)
router.get('/contact', clientController.getContactPage);

// --- ADD THIS LINE ---
// Handle Contact Form Submission
router.post('/contact', clientController.postContactForm);

module.exports = router;