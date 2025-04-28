const jwt = require("jsonwebtoken");

const protectAdmin = (req, res, next) => {
    const token = req.cookies.token;
    console.log('Token from cookies:', token);  // Log token for debugging

    if (!token) {
        return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    try {
        // Verify the token using the JWT_KEY_ADMIN secret
        const decoded = jwt.verify(token, process.env.JWT_KEY_ADMIN);
        req.user = decoded; // Store decoded token in request
        console.log('Decoded Token:', decoded);  // Log decoded token for debugging

        // Check if the user role is Admin
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ success: false, message: "Access denied, admin only" });
        }

        next();
    } catch (error) {
        console.error('Token verification error:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token expired, please log in again" });
        }
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

const protectUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY_USER);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token expired, please log in again" });
        }
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

module.exports = { protectAdmin, protectUser };
