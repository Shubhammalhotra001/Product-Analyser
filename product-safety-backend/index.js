const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./db');
const uploadRoutes = require('./routes/upload');
const app = express();
app.use(cors());
  
// Connect DB once
connectDB();

// Routes
app.use('/upload', uploadRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
