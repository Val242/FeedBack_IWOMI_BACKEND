// controllers/adminController.js

const mongoose = require('mongoose');
const FeedBack = require('../models/feedBack');

const assignFeedback = async (req, res) => {
  const feedbackId = req.params.id;
  const { assignedTo, status } = req.body;

  // Optional: Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(feedbackId)) {
    return res.status(400).json({ message: 'Invalid feedback ID format' });
  }

  try {
    const feedback = await FeedBack.findById(feedbackId);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Update feedback fields
    feedback.assignedTo = assignedTo || feedback.assignedTo;
    feedback.status = status || 'Assigned';

    await feedback.save();

    res.status(200).json({ message: 'Feedback assigned successfully', feedback });
  } catch (error) {
    console.error('Assignment error:', error.message);
    res.status(500).json({ message: 'Error assigning feedback', error: error.message });
  }
};

module.exports = { assignFeedback };
