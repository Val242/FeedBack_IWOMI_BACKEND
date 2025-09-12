const Feedback = require("../models/feedBack"); // Make sure the filename matches exactly

const getAssignedFeedbacks = async (req, res) => {
  const { developerId } = req.params;
  const { status } = req.query; // optional query parameter

  if (!developerId) {
    return res.status(400).json({ message: "Developer ID is required" });
  }

  try {
    // Build filter dynamically
    const filter = { assignedTo: developerId };
   if (status) {
  // Try without toLowerCase() first
  filter.status = status; 
}


    const feedbacks = await Feedback.find(filter)
      .populate("assignedTo", "name email")
      .sort({ timestamp: -1 });

    // Generate notifications dynamically
    const notifications = feedbacks.map((f) => ({
      id: f._id,
      message: `New feedback assigned: ${f.message}`,
      read: false,
      date: f.timestamp || f.date,
    }));

    res.status(200).json({ feedbacks, notifications });
  } catch (err) {
    console.error("Error fetching assigned feedbacks:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getAssignedFeedbacks };  