const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');
const { verifyToken } = require('../middleware/auth');

// Login route - POST /api/auth/login
router.post('/login', async (req, res) => {
  await AuthController.login(req, res);
});

// Register route - POST /api/auth/register
router.post('/register', async (req, res) => {
  await AuthController.register(req, res);
});

// Get current user - GET /api/auth/me
router.get('/me', verifyToken, async (req, res) => {
  await AuthController.getCurrentUser(req, res);
});

// Health check for auth module
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Auth module is running'
  });
});

module.exports = router;
