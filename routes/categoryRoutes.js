const express = require('express');
const { getCategories, createCategory, deleteCategory } = require('../controllers/categoryController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// GET all categories (Sobar jonno open)
router.get('/', getCategories);

// CREATE category (Shudhu logged in admin er jonno)
router.post('/', verifyToken, createCategory);

// DELETE category (Shudhu logged in admin er jonno)
router.delete('/:id', verifyToken, deleteCategory);

module.exports = router;