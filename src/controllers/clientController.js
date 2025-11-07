// --- ADD THIS IMPORT ---
const db = require('../config/db');

// Renders the client homepage
exports.getHomepage = (req, res) => {
    res.render('client/index', { 
        title: 'Welcome to HP TECHNOLOGY' 
    });
};

// Renders the services page
exports.getServicesPage = (req, res) => {
    res.render('client/services', { 
        title: 'Our Services' 
    });
};

// --- UPDATE THIS FUNCTION ---
// Renders the contact page
exports.getContactPage = (req, res) => {
    // Check for a success query parameter
    const success = req.query.success === 'true';
    
    res.render('client/contact', { 
        title: 'Contact Us',
        success: success // Pass success status to the view
    });
};

// --- ADD THIS NEW FUNCTION ---
// @desc    Handle contact form submission
// @route   POST /contact
exports.postContactForm = async (req, res) => {
    try {
        const { name, email, service, subject, message } = req.body;

        // Basic validation (the "required" attribute in HTML handles this, 
        // but server-side is good practice)
        if (!name || !email || !subject || !message) {
            return res.status(400).send('Please fill out all required fields.');
        }

        const sql = 'INSERT INTO SupportTickets (name, email, service, subject, message, status) VALUES (?, ?, ?, ?, ?, ?)';
        
        // Insert into database with 'New' status
        await db.query(sql, [name, email, service, subject, message, 'New']);

        // Redirect back to contact page with a success flag
        res.redirect('/contact?success=true');

    } catch (err) {
        console.error('Contact Form Error:', err);
        res.status(500).send('Server Error');
    }
};