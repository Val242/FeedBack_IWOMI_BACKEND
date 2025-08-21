// routes/admin.js
const express = require('express');
const router = express.Router();

const { assignFeedback } = require('../controllers/adminContoller'); // Adjust path if needed

const auth = require('../middleware/auth-middleware');        // Authentication middleware
const role = require('../middleware/roleMiddleware')
 // Should log: [Function: assignFeedback]
      // Role check middleware

// Route to manually assign a feedback by name
router.put('/feedbacks/assign/:id', auth, role('admin'), assignFeedback);

module.exports = router;
