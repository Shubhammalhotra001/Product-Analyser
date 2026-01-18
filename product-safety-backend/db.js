// db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(' MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

const imageSchema = new mongoose.Schema({
  originalFilename: String,
  imageKey: String,
  text: String,
  s3Url: String,
  extractedText: String,
  uploadedAt: { type: Date, default: Date.now },

  gradedIngredients: [
    {
      name: String,
      grade: String
    }
  ]
});

const ImageModel = mongoose.model('Image', imageSchema);

module.exports = { connectDB, ImageModel };
