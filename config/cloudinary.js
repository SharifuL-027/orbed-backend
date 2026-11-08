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

// Setup Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'orbed-energy', 
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'pdf', 'doc', 'docx'], // Image ebong CV/Doc duitai allow korar jonno
  },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };