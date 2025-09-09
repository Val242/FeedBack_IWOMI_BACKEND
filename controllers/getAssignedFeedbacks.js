const Feedback = require('../models/feedBack');

const getAssignedFeedbacks = async (req, res) => {
  const { developerId } = req.params;
  if (!developerId) return res.status(400).json({ message: 'Developer ID is required' });

  try {
    const feedbacks = await Feedback.find({ assignedTo: developerId })
      .populate('assignedTo', 'name email')
      .sort({ timestamp: -1 });

    // Generate notifications dynamically
    const notifications = feedbacks.map(f => ({
      id: f._id,
      message: `New feedback assigned: ${f.title}`,
      read: false,
      date: f.timestamp || f.date
    }));

    res.status(200).json({ feedbacks, notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getAssignedFeedbacks };
