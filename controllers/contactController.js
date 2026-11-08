const Contact = require('../models/Contact');

// Get all messages (Admin)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new contact message (Public)
exports.createMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const newMsg = new Contact({
      name,
      email,
      phone,
      subject,
      message
    });

    await newMsg.save();
    res.status(201).json({ success: true, message: 'Message sent successfully', data: newMsg });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete message (Admin)
exports.deleteMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};