const passport = require('passport');

// @desc    Show Login Page
// @route   GET /auth/login
exports.getLogin = (req, res) => {
    // Check if user is already logged in
    if (req.isAuthenticated()) {
        return res.redirect('/dashboard');
    }
    
    // Render the login page and pass in any flash messages (errors)
    res.render('auth/login', {
        message: req.flash('loginMessage')
    });
};

// @desc    Process Login Form
// @route   POST /auth/login
exports.postLogin = passport.authenticate('local', {
    successRedirect: '/dashboard',      // On success, go to the dashboard
    failureRedirect: '/auth/login',     // On failure, return to login page
    failureFlash: true                  // Enable flash messages (like "Wrong password")
});

// @desc    Logout User
// @route   GET /logout
exports.getLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
};