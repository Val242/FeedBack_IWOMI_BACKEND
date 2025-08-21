const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: 
  { type: String,
     required: true, 
     unique: true
     },
  email: 
  { type: String, 
    required: true, 
    unique: true
 }, // contact email

  createdAt: { type: Date, default: Date.now },
    admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin', // ✅ This references your existing Admin model
    required: true
  },
 
});

module.exports = mongoose.model('Company', companySchema);

