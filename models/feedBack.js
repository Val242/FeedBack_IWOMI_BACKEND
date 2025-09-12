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
  image: {
     type: String,
     required: true
    },
  type: {
    type: String,
    enum: ['bug', 'feature', 'general', 'improvement','other'],
    default: 'General'
  },
  criticality: {
    type: String,
    enum: ['low', 'average', 'high', 'blocking'],
    default: 'low'
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
   // enum: ['new', 'assigned', 'inprogress', 'resolved', 'closed'],
    default: 'New'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
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
    },
  ]
});

module.exports = mongoose.model('Feedback', feedbackSchema);
