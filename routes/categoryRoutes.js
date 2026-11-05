const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
// (Ami dhore nicchi controllers folder e categoryController ache, kintu apni ekhaneo directly logoc likhte paren)
// const { getCategories, createCategory, deleteCategory } = require('../controllers/categoryController');

const router = express.Router();

// GET all categories (Sobar jonno open)
router.get('/', (req, res) => {
  res.json({ message: "Get all categories logic here" });
});

// CREATE category (Shudhu logged in user ba admin er jonno)
router.post('/', verifyToken, (req, res) => {
  res.json({ message: "Create category logic here" });
});

// DELETE category (Shudhu logged in user ba admin er jonno)
router.delete('/:id', verifyToken, (req, res) => {
  res.json({ message: `Delete category ${req.params.id} logic here` });
});

module.exports = router;