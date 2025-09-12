// controllers/adminController.js
const mongoose = require('mongoose');
const FeedBack = require('../models/feedBack');
const sendEmail = require('../utils/mail'); // your nodemailer wrapper

const assignFeedback = async (req, res) => {
  const feedbackId = req.params.id;
  const { assignedTo, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(feedbackId)) {
    return res.status(400).json({ message: 'Invalid feedback ID format' });
  }

  try {
    const feedback = await FeedBack.findById(feedbackId).populate("assignedTo", "name email");

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Update feedback fields
    feedback.assignedTo = assignedTo || feedback.assignedTo;
    feedback.status = status || 'Assigned';

    //await feedback.save();
await feedback.populate("assignedTo", "name email");
    // --- ADDITION: Send email notification to assigned developer ---
    if (assignedTo && feedback.assignedTo?.email) {
      try {
        await sendEmail({
          to: feedback.assignedTo.email,
          subject: 'New Feedback Assigned',
          text: `Hi ${feedback.assignedTo.name},\n\nA new feedback has been assigned to you:\n\nMessage: ${feedback.message}`,
          html: `<p>Hi ${feedback.assignedTo.name},</p>
                 <p>A new feedback has been assigned to you:</p>
                 <p><strong>Message:</strong> ${feedback.message}</p>`
        });
        console.log(`Email sent to ${feedback.assignedTo.email}`);
      } catch (emailErr) {
        console.error('Error sending email:', emailErr.message);
      }
    }
    console.log("Hello")
 await feedback.save();
    res.status(200).json({ message: 'Feedback assigned successfully', feedback });
  } catch (error) {
    console.error('Assignment error:', error.message);
    res.status(500).json({ message: 'Error assigning feedback', error: error.message });
  }
  
};

module.exports = { assignFeedback };
