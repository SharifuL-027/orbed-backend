const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  message: { type: String },
  cv: { type: String }, // Cloudinary ba file path URL
}, { timestamps: true });

module.exports = mongoose.model('Career', careerSchema);