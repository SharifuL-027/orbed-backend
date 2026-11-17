const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Gallery = require('../models/Gallery');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `gallery-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

// GET all gallery items
router.get('/', async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load gallery', error: error.message });
  }
});

// POST upload new gallery image (Admin)
// POST upload single or multiple gallery images (Admin)
router.post('/', upload.array('images', 20), async (req, res) => {
  try {
    const { title, category, location, isFeatured } = req.body;
    const files = req.files || [];

    if (files.length === 0) {
      return res.status(400).json({ message: 'Please select at least one image' });
    }

    const featuredFlag = isFeatured === 'true' || isFeatured === true;

    const docsToInsert = files.map((file, index) => {
      // Title na dile file-er original name use korbe; multiple hole numbering korbe
      const cleanFileName = path.parse(file.originalname).name.replace(/[-_]+/g, ' ');
      const itemTitle = title?.trim()
        ? files.length > 1
          ? `${title.trim()} (${index + 1})`
          : title.trim()
        : cleanFileName;

      return {
        title: itemTitle,
        category: category || 'Solar Projects',
        location: location || 'Bangladesh',
        imageUrl: `/api/uploads/${file.filename}`,
        isFeatured: featuredFlag,
      };
    });

    const savedItems = await Gallery.insertMany(docsToInsert);
    res.status(201).json(savedItems);
  } catch (error) {
    res.status(400).json({ message: 'Failed to upload gallery items', error: error.message });
  }
});

// PUT toggle featured status (Admin)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update item', error: error.message });
  }
});

// DELETE gallery image (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Remove local file if stored in /api/uploads/
    if (item.imageUrl && item.imageUrl.startsWith('/api/uploads/')) {
      const filePath = path.join(uploadDir, path.basename(item.imageUrl));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
});

module.exports = router;