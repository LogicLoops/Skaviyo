const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'skaviyo_dev';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      console.log('[AUTH_MIDDLEWARE] No token provided');
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.log('[AUTH_MIDDLEWARE] Token verification failed:', err.message);
        return res.status(403).json({
          success: false,
          message: 'Invalid or expired token'
        });
      }

      console.log('[AUTH_MIDDLEWARE] Token verified for user:', user.id);
      req.user = user;
      next();
    });
  } catch (error) {
    console.error('[AUTH_MIDDLEWARE] Middleware error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Middleware to check user role
const verifyRole = (requiredRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        console.log('[AUTH_MIDDLEWARE] No user found in request');
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      if (!requiredRoles.includes(req.user.role)) {
        console.log('[AUTH_MIDDLEWARE] User role not authorized:', req.user.role);
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to access this resource'
        });
      }

      console.log('[AUTH_MIDDLEWARE] User role verified:', req.user.role);
      next();
    } catch (error) {
      console.error('[AUTH_MIDDLEWARE] Role verification error:', error.message);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  };
};

module.exports = {
  verifyToken,
  verifyRole
};
