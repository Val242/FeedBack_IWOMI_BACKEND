const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary')

//configure cloudinary 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

//Create storage engine for multer
const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpg','png','jpeg']
    }
})

module.exports = {
    cloudinary,
    storage
}