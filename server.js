require('dotenv').config(); // Env theke sob data load korbe
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); // 👈 App initialization ekhane kora holo

// Route file gulo import kora
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const careerRoutes = require('./routes/careerRoutes');
const contactRoutes = require('./routes/contactRoutes');

// --- 🔥 IMPORTANT MIDDLEWARES (Eigulo missing chilo) ---
app.use(express.json()); // JSON data read korar jonno
app.use(express.urlencoded({ extended: true })); // Form data read korar jonno

// CORS Setup
const corsOptions = {
  origin: [
    'http://localhost:5173',                 // Ekhane 'https' hobe na, shudhu 'http' hobe
    'https://orbedenergy.com'       // Ekhane 'https' hobe (karon live site secure thake)
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
};
app.use(cors(corsOptions));

// API Routes setup
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/uploads', express.static('uploads'));

// MongoDB Connection & Server Start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err.message);
  });