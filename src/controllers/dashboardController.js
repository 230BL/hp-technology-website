// Renders the dashboard homepage
exports.getDashboardHome = (req, res) => {
    res.render('dashboard/index', { 
        title: 'HP Admin Dashboard'
        // user: req.user // Passport.js will add this
    });
};

// Renders the product management page
exports.getProductsPage = (req, res) => {
    res.render('dashboard/manage-products', { 
        title: 'Manage Products'
    });
};