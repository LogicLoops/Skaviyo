const crypto = require('crypto');

// Simple JWT token generator (without library for simplicity)
// In production, use jsonwebtoken library

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

const generateToken = (user) => {
  console.log('[JWT] Generating token for user:', user.email);
  
  // Create a simple token (header.payload.signature)
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const payload = Buffer.from(JSON.stringify({
    id: user.id,
    email: user.email,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
  })).toString('base64');
  
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(header + '.' + payload)
    .digest('base64');
  
  const token = `${header}.${payload}.${signature}`;
  console.log('[JWT] Token generated successfully');
  return token;
};

const verifyToken = (token) => {
  console.log('[JWT] Verifying token');
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('[JWT] Invalid token format');
      return null;
    }
    
    const [header, payload, signature] = parts;
    
    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(header + '.' + payload)
      .digest('base64');
    
    if (signature !== expectedSignature) {
      console.error('[JWT] Invalid signature');
      return null;
    }
    
    // Decode payload
    const decoded = JSON.parse(Buffer.from(payload, 'base64').toString());
    
    // Check expiration
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      console.error('[JWT] Token expired');
      return null;
    }
    
    console.log('[JWT] Token verified successfully');
    return decoded;
  } catch (error) {
    console.error('[JWT] Token verification failed:', error.message);
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken
};
