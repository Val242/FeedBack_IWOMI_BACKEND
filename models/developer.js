const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true 
    },
  email: { 
    type: String,
     required: true, 
     unique: true
     },
  
  password: { 
    type: String, 
    required: true 
}, // hashed with bcrypt
  role: {
    type: String,
    enum: ['developer', 'admin'],
    default: 'developer'
  }
});

module.exports = mongoose.model('Developer', developerSchema);
