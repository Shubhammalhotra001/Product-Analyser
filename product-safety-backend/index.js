const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const { extractTextFromS3Image } = require('./rekognitionUtil');
const { ImageModel, connectDB } = require('./db');
const { gradeIngredients } = require('./gradeutil');
require('dotenv').config();

const app = express();
app.use(cors());

// Connect DB ONCE
connectDB();

// Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// AWS S3 client
const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Upload route
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    console.log('📥 Upload request received');

    const imageKey = 'uploads/' + req.file.originalname;
    console.log('🗂️ Image key:', imageKey);

    const s3Upload = new Upload({
      client: s3Client,
      params: {
        Bucket: 'productimages2025',
        Key: imageKey,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      },
    });

    const result = await s3Upload.done();
    console.log('✅ Uploaded to S3:', result.Location);

    const detectedText = await extractTextFromS3Image('productimages2025', imageKey);
    console.log('🧠 OCR text extracted');

    const gradedIngredients = gradeIngredients(detectedText);
    console.log('🥇 Ingredients graded:', gradedIngredients);

    const imageData = new ImageModel({
      originalFilename: req.file.originalname,
      imageKey,
      s3Url: result.Location,
      text: detectedText,
      extractedText: detectedText,
      gradedIngredients
    });

    await imageData.save();
    console.log('📦 Data saved to MongoDB');

    res.json({
      message: 'Upload + OCR + Grading successful',
      filename: imageKey,
      url: result.Location,
      text: detectedText,
      gradedIngredients
    });

  } catch (err) {
    console.error('🔥 Upload/OCR Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
