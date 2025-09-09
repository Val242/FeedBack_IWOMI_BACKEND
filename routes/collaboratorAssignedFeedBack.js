const express = require('express');
const router = express.Router();
const { getAssignedFeedbacks } = require('../controllers/getAssignedFeedbacks');

// GET all feedbacks assigned to a collaborator
router.get('/:developerId', getAssignedFeedbacks);

module.exports = router;
