const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const roleMiddleware = require('../middleware/roleMiddleware'); // ✅ matches CommonJS
// must return a function
const router = express.Router();

router.get(
  '/collaboratordashboard',
  authMiddleware,
  roleMiddleware('collaborator'), // works now
  async (req, res) => {
    res.status(200).json({ message: 'Welcome, Admin' });
  }
);

module.exports = router;