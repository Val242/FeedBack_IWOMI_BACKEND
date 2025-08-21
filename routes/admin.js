const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const roleMiddleware = require('../middleware/roleMiddleware'); // ✅ matches CommonJS


const router = express.Router();

router.get(
  '/dashboard',
  authMiddleware,
  roleMiddleware('admin'), // works now
  async (req, res) => {
    res.status(200).json({ message: 'Welcome, Admin' });
  }
);

module.exports = router;
