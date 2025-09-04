// config/cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create storage engine for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',                 // Cloudinary folder name
    allowed_formats: ['jpg', 'jpeg', 'png'], // allowed file formats
  },
});

// Create multer middleware
const upload = multer({ storage });

module.exports = {
  cloudinary,
  storage,
  upload,  // export upload for route usage
};
