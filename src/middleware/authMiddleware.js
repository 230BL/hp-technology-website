// in: src/middleware/authMiddleware.js

// This middleware checks if a user is logged in
exports.ensureAuth = (req, res, next) => {
    if (req.session.user) {
        return next(); // User is logged in, proceed
    }
    
    // User is not logged in, redirect to login
    res.redirect('/auth/login');
};

// This middleware checks if a user is an Admin
exports.ensureAdmin = (req, res, next) => {
    // We already know they are logged in if this is chained after ensureAuth
    // But it's good to check both just in case
    if (req.session.user && req.session.user.type === 'admin') {
        return next(); // User is an admin, proceed
    }
    
    // User is logged in but not an admin
    res.redirect('/');
};