const express = require('express');
const router = express.Router();

// 🧠 Controller
const { getAllFeedbacks } = require('../controllers/feedback-controller');

// 🛡️ Middleware
const authMiddleware = require('../middleware/auth-middleware');
const roleMiddleware = require('../middleware/roleMiddleware')

// 📥 ROUTES

// ✅ GET all feedbacks (Admin only)
router.get(
  '/feedbacks',
  authMiddleware,
  roleMiddleware('admin'),
  async (req, res) => {
    try {
      await getAllFeedbacks(req, res);
    } catch (error) {
      console.error('Error fetching feedbacks:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

module.exports = router;
