const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true
  },
  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  image: { type: String },
  type: {
    type: String,
    enum: ['Bug', 'Feature Request', 'General','Improvement Suggestion'],
    default: 'General'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Developer',
    default: null
  },
  status: {
    type: String,
    enum: ['New', 'Assigned', 'In Progress', 'Resolved', 'Closed'],
    default: 'New'
  },
  comments: [
    {
      author: {
        type: String // You can change to developer/admin ID if needed
      },
      message: String,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model('Feedback', feedbackSchema);
