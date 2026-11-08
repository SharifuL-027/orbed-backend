const Product = require('../models/Product');

// GET all products (Public)
exports.getProducts = async (req, res) => {
  try {
    // Populate use kora hoyeche jate frontend category er nam dekhte pare
    const products = await Product.find().populate('category', 'name').sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET products by category ID (Public)
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId }).populate('category', 'name');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// CREATE product (Protected)
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    
    // 🔥 req.files theke loop chaliye shobgulo path/URL ber kora
    const uploadedImages = req.files ? req.files.map(file => file.path) : [];

    const newProduct = new Product({
      name,
      price,
      category,
      description,
      imageUrls: uploadedImages 
    });

    await newProduct.save();
    const populatedProduct = await Product.findById(newProduct._id).populate('category', 'name');
    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    
    const updateData = { name, price, category, description };

    // Jodi notun image upload hoy, tahole ager gulo replace kore dibe
    if (req.files && req.files.length > 0) {
      updateData.imageUrls = req.files.map(file => file.path);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    ).populate('category', 'name');

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE product (Protected)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};