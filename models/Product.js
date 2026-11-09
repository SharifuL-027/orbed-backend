// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  description: { type: String },
 
  stock: { type: String },
  imageUrls: [{ type: String }],
  
  // 🔥 Notun features array add kora holo bullet point er jonno
  features: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);