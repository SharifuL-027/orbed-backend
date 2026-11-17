const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: 'Solar Projects', // e.g., Solar Projects, Industrial, Events, Team
      trim: true,
    },
    location: {
      type: String,
      default: 'Bangladesh',
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: true, // Top Carousel-e dekhabe kina
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySchema);