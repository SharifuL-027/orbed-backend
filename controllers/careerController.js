const Career = require('../models/Career');

// GET shob applications anar jonno (Admin)
exports.getApplications = async (req, res) => {
  try {
    const applications = await Career.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// CREATE notun application (Frontend form theke)
exports.createApplication = async (req, res) => {
  try {
    const { name, email, phone, position, message } = req.body;
    let cvUrl = '';
    
    // Jodi Cloudinary ba Multer theke file ashe
    if (req.file) {
      cvUrl = req.file.path;
    }

    const newApp = new Career({
      name, email, phone, position, message, cv: cvUrl
    });

    await newApp.save();
    res.status(201).json({ success: true, data: newApp });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE application (Admin)
exports.deleteApplication = async (req, res) => {
  try {
    await Career.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};