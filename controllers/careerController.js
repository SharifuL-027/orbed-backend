const Career = require('../models/Career');

// Get all applications (Admin)
exports.getApplications = async (req, res) => {
  try {
    const applications = await Career.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new job application (Public)
exports.createApplication = async (req, res) => {
  try {
    const { name, email, phone, position, message } = req.body;
    let cvUrl = '';
    
    // Jodi file upload hoy (Multer / Cloudinary babohar korle)
    if (req.file) {
      cvUrl = req.file.path; // ba req.file.url
    }

    const newApp = new Career({
      name,
      email,
      phone,
      position,
      message,
      cv: cvUrl
    });

    await newApp.save();
    res.status(201).json({ success: true, message: 'Application submitted successfully', data: newApp });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete application (Admin)
exports.deleteApplication = async (req, res) => {
  try {
    await Career.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};