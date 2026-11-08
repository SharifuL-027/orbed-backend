const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup Storage for Multer (Fixed for both Career CVs and Multiple Product Images)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // 1. Jodi file ta PDF, DOC ba DOCX hoy (Career CV)
    if (
      file.mimetype === 'application/pdf' || 
      file.mimetype.includes('officedocument') || 
      file.mimetype.includes('msword')
    ) {
      return {
        folder: 'orbed-energy/cv',
        resource_type: 'raw',
      };
    }
    
    // 2. Jodi normal chobi (Product Image - single ba multiple) hoy
    return {
      folder: 'orbed-energy/products',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
      resource_type: 'image',
      // 🔥 Multiple image / imageUrls er unique public_id handle korar jonno
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
    };
  },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };