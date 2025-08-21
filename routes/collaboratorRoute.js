const express = require('express');
const router = express.Router();

// 🧠 Controller
const { getAllCollaborators } = require('../controllers/getCollaborator');

// 🛡️ Middleware
const authMiddleware = require('../middleware/auth-middleware');
const roleMiddleware = require('../middleware/roleMiddleware')

// 📥 ROUTES

// ✅ GET all feedbacks (Admin only)
router.get(
  '/collaborator',
  authMiddleware,
  roleMiddleware('admin'),
  async (req, res) => {
    try {
      await getAllCollaborators(req, res);
    } catch (error) {
      console.error('Error fetching collaborators:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

module.exports = router;
