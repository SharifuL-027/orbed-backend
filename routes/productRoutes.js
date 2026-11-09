const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary'); // Cloudinary upload config import
const { 
  getProducts, 
  getProductsByCategory,
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');

const router = express.Router();

// GET all products (Public)
router.get('/', getProducts);

// GET products by category ID (Public)
router.get('/category/:categoryId', getProductsByCategory);
router.get('/:id', getProductById);
// CREATE product (Protected) - Multiple images er jonno
router.post('/', verifyToken, upload.array('imageUrls', 5), createProduct);

// UPDATE product (Protected) - Multiple images er jonno
router.put('/:id', verifyToken, upload.array('imageUrls', 5), updateProduct);

// DELETE product (Protected)
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;