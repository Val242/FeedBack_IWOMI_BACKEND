// GET /api/feedbacks
const FeedBack = require('../models/feedBack');
const Developer = require('../models/developer');

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await FeedBack.find()
      .populate('assignedTo', 'name email') // optional: if you want developer details
            // optional: if you linked feedback to a company
    
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ message: 'Server error while fetching feedbacks' });
  }
};


module.exports = { getAllFeedbacks };