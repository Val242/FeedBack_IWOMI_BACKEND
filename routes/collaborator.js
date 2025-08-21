const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const roleMiddleware = require('../middleware/roleMiddleware'); // ✅ matches CommonJS
// must return a function
const router = express.Router();

router.get(
  '/collaboratordashboard',
  authMiddleware,
  roleMiddleware('collaborator'), // ✅ must be a function
  async (req, res) => {
    try {
      res.status(200).json({ message: 'Welcome, Collaborator' });
    } catch (error) {
      console.error('Error in /dashboard route:', error);
      res.status(500).json({ error: 'Server Error. Please try again later.' });
    }
  }
);

module.exports = router;
