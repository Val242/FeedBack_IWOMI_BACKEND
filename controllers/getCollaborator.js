const Developer = require('../models/developer');

const getAllCollaborators = async (req, res) => {
  try {
    const developer = await Developer.find()
     
    
    res.status(200).json(developer);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ message: 'Server error while fetching list of collaborators' });
  }
};


module.exports = { getAllCollaborators };