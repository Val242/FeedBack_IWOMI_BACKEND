// routes/collaborator.js
const express = require("express");
const router = express.Router();
const { updateFeedback } = require("../controllers/updatingContoller");
const authMiddleware = require("../middleware/auth-middleware");

// Update feedback progress & status
//router.put("/feedbacks/:id", authMiddleware, updateFeedback);
router.put("/feedbacks/:id",  updateFeedback);

module.exports = router;
