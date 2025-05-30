// db.js
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

  const imageSchema = new mongoose.Schema({
    originalFilename: String,
    imageKey: String,
    text: String,
    s3Url: String,
    extractedText: String,
    uploadedAt: { type: Date, default: Date.now },
  
    // 👇 ADD THIS LINE
    gradedingredients: [
      {
        name: String,
        grade: String
      }
    ]
  });

const ImageModel = mongoose.model('Image', imageSchema);

module.exports = { ImageModel };
