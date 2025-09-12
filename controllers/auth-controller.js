const Admin = require('../models/admin');
const FeedBack = require('../models/feedBack');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { cloudinary, storage } = require('../config/cloudinary');
const multer = require('multer');
const Developer = require('../models/developer');
const upload = multer({ storage });

// Controller function for registering feedback
const registerFeedBack = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.name);
    const { name, email, message, type, status, comments,criticality } = req.body;
    const timestamp = new Date();

    // Multer + Cloudinary stores uploaded file info in req.file
    const imageUrl = req.file ? req.file.path : null;

        if (!imageUrl) {
      return res.status(400).json({ message: "Image is required" });
    }    

    const newFeedBack = new FeedBack({
      name,
      email,
      message,
      type,
      timestamp,
      status,
      comments,
      image: imageUrl,
      criticality
    });

    await newFeedBack.save();
    console.info('Feedback Received successfully');

    res.status(201).json({ message: 'Received a user feedback' });
  } catch (error) {
    console.log('Registration Error:', error);
    res.status(500).json({ message: 'Server error during the registration of the feedback' });
  }
};

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingAdmin = await Admin.findOne({ name: name.toLowerCase() });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name: name.toLowerCase(),
      email,
      password: hashedPassword,
      role,
    });

    await newAdmin.save();
    console.info('Registration successful');

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

const registerDeveloper = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingDeveloper = await Developer.findOne({ name: name.toLowerCase() });
    if (existingDeveloper) {
      return res.status(400).json({ message: 'Collaborator already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDeveloper = new Developer({
      name: name.toLowerCase(),
      email,
      password: hashedPassword,
      role,
    });

    await newDeveloper.save();
    console.info('Collaborator Registration successful');

    res.status(201).json({ message: 'Collaborator registered successfully' });
  } catch (error) {
    console.error('Collaborator Registration Error:', error);
    res.status(500).json({ message: 'Server error during collaborator registration' });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { name, password } = req.body;
    const normalizedAdminName = name.trim().toLowerCase();

    const admin = await Admin.findOne({ name: normalizedAdminName });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        adminId: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      adminId: admin._id,
      role: admin.role,
    });
  } catch (error) {
    console.log('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};


const developerLogin = async (req, res) => {
  try {
    const { name, password } = req.body;
    const normalizeddeveloperName = name.trim().toLowerCase();

    const developer = await Developer.findOne({ name: normalizeddeveloperName });
    if (!developer) {
      return res.status(401).json({ message: 'Invalid collaborator credentials' });
    }

    const isMatch = await bcrypt.compare(password, developer.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        developerId: developer._id,
        role: developer.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '10s' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      developerId: developer._id,
      role: developer.role,
      name
    });
  } catch (error) {
    console.log('Login Error:', error);
    res.status(500).json({ message: 'Server error during dev login' });
  }
};

module.exports = {
  registerFeedBack,
  registerAdmin,
  adminLogin,
  registerDeveloper,
  developerLogin,
  upload, // export multer upload middleware so you can use it in your routes
};
