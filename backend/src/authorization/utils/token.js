const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'skaviyo_dev';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Generate JWT token
const generateToken = (userId, email, role) => {
  try {
    console.log('[TOKEN_UTIL] Generating token for user:', userId);
    const token = jwt.sign(
      {
        id: userId,
        email,
        role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    return token;
  } catch (error) {
    console.error('[TOKEN_UTIL] Error generating token:', error.message);
    throw error;
  }
};

// Verify JWT token
const verifyTokenUtil = (token) => {
  try {
    console.log('[TOKEN_UTIL] Verifying token');
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('[TOKEN_UTIL] Token verified for user:', decoded.id);
    return decoded;
  } catch (error) {
    console.error('[TOKEN_UTIL] Token verification failed:', error.message);
    throw error;
  }
};

// Decode token without verification (for debugging)
const decodeToken = (token) => {
  try {
    const decoded = jwt.decode(token);
    console.log('[TOKEN_UTIL] Token decoded');
    return decoded;
  } catch (error) {
    console.error('[TOKEN_UTIL] Error decoding token:', error.message);
    return null;
  }
};

module.exports = {
  generateToken,
  verifyTokenUtil,
  decodeToken
};
