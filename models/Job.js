const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      default: 'Full-Time', // e.g., Full-Time, Part-Time, Internship, Contract
    },
    location: {
      type: String,
      default: 'Dhaka, Bangladesh',
    },
    department: {
      type: String,
      default: 'Engineering',
    },
    description: {
      type: String,
      default: '',
    },
    deadline: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);