// controllers/feedbackController.js
const Feedback = require("../models/feedBack");

// Update feedback progress & status
const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { progress, status } = req.body;

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { progress, status },
      { new: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.json({
      message: "Feedback updated successfully",
      feedback: updatedFeedback,
    });
  } catch (err) {
    console.error("Error updating feedback:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { updateFeedback };
