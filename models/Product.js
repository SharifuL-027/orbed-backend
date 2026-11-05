const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', // Category collection er sathe link kora holo
    required: true 
  },
  description: { type: String },
  imageUrls: [{ type: String }] // Cloudinary image URL er jonno Array
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);