const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const { getApplications, createApplication, deleteApplication } = require('../controllers/careerController');

// Backend e 'uploads/cv' folder na thakle auto toiri korbe
const uploadDir = 'uploads/cv';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Local Storage Setup (CV gulo ekhane save hobe)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '-')); // Nam theke space soriye dibe
  }
});
const uploadLocal = multer({ storage: storage });

// Routes
router.get('/', getApplications);

// 🔥 Ekhane Cloudinary er bodole amader local uploadLocal babohar kora hocche
router.post('/', uploadLocal.single('cv'), createApplication);

router.delete('/:id', deleteApplication);

module.exports = router;