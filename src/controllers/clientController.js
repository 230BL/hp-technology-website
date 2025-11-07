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

// Renders the contact page
exports.getContactPage = (req, res) => {
    res.render('client/contact', { 
        title: 'Contact Us' 
    });
};