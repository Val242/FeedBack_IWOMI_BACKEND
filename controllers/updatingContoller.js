// controllers/feedbackController.js
const Feedback = require("../models/feedBack");
const sendEmail = require("../utils/mail");

// Update feedback progress & status
const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { progress, status } = req.body;

    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    // Update fields
    feedback.progress = progress ?? feedback.progress;
    feedback.status = status ?? feedback.status;

    await feedback.save();

    // Send email if progress reached 100
    if (feedback.progress === 100 && feedback.email) {
      try {
        await sendEmail({
          to: feedback.email,
          subject: "Your Feedback Has Been Completed",
          text: `Hi ${feedback.name || 'User'},\n\nYour feedback has been completed:\n\nMessage: ${feedback.message}`,
          html: `<p>Hi ${feedback.name || 'User'},</p>
                 <p>Your feedback has been completed:</p>
                 <p><strong>Message:</strong> ${feedback.message}</p>`
        });
        console.log(`Completion email sent to ${feedback.email}`);
      } catch (emailErr) {
        console.error("Error sending completion email:", emailErr.message);
      }
    }

    res.json({
      message: "Feedback updated successfully",
      feedback,
    });
  } catch (err) {
    console.error("Error updating feedback:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { updateFeedback };
