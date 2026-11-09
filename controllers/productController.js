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
    // 🔥 price bad diye features add kora holo
    const { name, category, description, stock, features } = req.body;
    
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => file.path);
    }

    // Frontend theke features array hishebe ba stringified JSON hishebe ashte pare
    let parsedFeatures = [];
    if (features) {
      try {
        parsedFeatures = JSON.parse(features);
      } catch (e) {
        parsedFeatures = Array.isArray(features) ? features : [features];
      }
    }

    const newProduct = new Product({
      name,
      category,
      description,
      stock,
      features: parsedFeatures, 
      imageUrls
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: 'Product created', data: newProduct });
  } catch (error) {
    console.error("Error:", error);
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
// Get Single Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching single product:", error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};