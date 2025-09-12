// GET /api/feedbacks?assignedTo=<devId|assigned|null>
const FeedBack = require('../models/feedBack');
const Developer = require('../models/developer');

const getAllFeedbacks = async (req, res) => {
  try {
    const { assignedTo } = req.query; // optional query param

    let filter = {};

    if (assignedTo === "null") {
      // Unassigned feedbacks
      filter.assignedTo = null;
    } else if (assignedTo === "assigned") {
      // All feedbacks that have been assigned
      filter.assignedTo = { $ne: null };
    } else if (assignedTo) {
      // Feedbacks for a specific developer
      filter.assignedTo = assignedTo;
    }

    const feedbacks = await FeedBack.find(filter)
      .populate('assignedTo', 'name email role') // populate developer info
      .sort({ timestamp: -1 }); // newest first

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ message: 'Server error while fetching feedbacks', error: error.message });
  }
};

module.exports = { getAllFeedbacks };
