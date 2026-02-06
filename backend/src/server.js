const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Import authorization routes
const authRoutes = require('./authorization/routes/auth');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.text({ type: 'text/plain' }));

// Request body parser for various content types
app.use((req, res, next) => {
  if (req.is('text/plain') && typeof req.body === 'string') {
    try {
      req.body = JSON.parse(req.body);
    } catch (e) {
      // Keep as string if not valid JSON
    }
  }
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Authorization routes
app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`[SERVER] Skaviyo Backend running on http://localhost:${PORT}`);
  console.log(`[SERVER] Health check: http://localhost:${PORT}/health`);
});
