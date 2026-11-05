const Category = require('../models/Category');

// Get all categories (Public)
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Create category (Admin only via verifyToken)
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Category name is required" });

    // Slug toiri kora (jemon: "Solar Panel" -> "solar-panel")
    const slug = name.toLowerCase().replace(/[\s]+/g, '-');

    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) return res.status(400).json({ message: "Category already exists" });

    const newCategory = new Category({ name, slug });
    await newCategory.save();

    res.status(201).json({ message: "Category created successfully", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete category (Admin only)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    
    if (!deletedCategory) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { getCategories, createCategory, deleteCategory };