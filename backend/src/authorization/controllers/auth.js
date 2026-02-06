const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'skaviyo_dev';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

class AuthController {
  // Login user
  static async login(req, res) {
    try {
      const { email, password, role } = req.body;

      console.log('[AUTH_CONTROLLER] Login attempt for email:', email);

      // Validate input
      if (!email || !password || !role) {
        console.log('[AUTH_CONTROLLER] Missing email or password, or role');
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      // Find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        console.log('[AUTH_CONTROLLER] User not found for email:', email);
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Check if user is active
      if (user.status !== 'ACTIVE') {
        console.log('[AUTH_CONTROLLER] User is inactive:', email);
        return res.status(401).json({
          success: false,
          message: 'User account is inactive'
        });
      }

      // Validate password using bcrypt comparison
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        console.log('[AUTH_CONTROLLER] Invalid password for user:', email);
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }
      
      if (user.role !== role.toUpperCase()) {
        console.log('[AUTH_CONTROLLER] User role mismatch for user:', email);
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to access this resource'
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          id: String(user.id),
          email: user.email,
          role: user.role
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      console.log('[AUTH_CONTROLLER] Login successful for user:', email);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: String(user.id),
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    } catch (error) {
      console.error('[AUTH_CONTROLLER] Login error:', error.message);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Register user
  static async register(req, res) {
    try {
      const { email, password, name, phone } = req.body;

      console.log('[AUTH_CONTROLLER] Register attempt for email:', email);

      // Validate input
      if (!email || !password || !name) {
        console.log('[AUTH_CONTROLLER] Missing required fields');
        return res.status(400).json({
          success: false,
          message: 'Email, password, and name are required'
        });
      }

      // Check if user already exists
      const existingUser = await User.exists(email);
      if (existingUser) {
        console.log('[AUTH_CONTROLLER] User already exists:', email);
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      // Create new user
      const newUser = await User.create({
        email,
        password, // In production, this should be hashed with bcrypt
        name,
        phone,
        role: 'CUSTOMER'
      });

      console.log('[AUTH_CONTROLLER] User registered successfully:', email);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: newUser
      });
    } catch (error) {
      console.error('[AUTH_CONTROLLER] Register error:', error.message);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get current user
  static async getCurrentUser(req, res) {
    try {
      const userId = req.user.id;

      console.log('[AUTH_CONTROLLER] Getting current user:', userId);

      const user = await User.findById(userId);
      if (!user) {
        console.log('[AUTH_CONTROLLER] User not found:', userId);
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      console.error('[AUTH_CONTROLLER] Get current user error:', error.message);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = AuthController;
