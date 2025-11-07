// in: src/middleware/authMiddleware.js

// This middleware will protect our dashboard
exports.isEmployee = (req, res, next) => {
    
    // This is where we'll check if a user is logged in
    // and has the role 'employee' or 'admin'.
    
    // For now, we'll just log to the console and let everyone pass
    console.log("Auth middleware check (isEmployee)... allowing access for development.");
    next();
};