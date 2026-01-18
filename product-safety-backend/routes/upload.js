const express = require('express');
const multer = require('multer');
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

const { extractTextFromS3Image } = require('../rekognitionUtil');
const { ImageModel } = require('../db');
const { gradeIngredients } = require('../gradeutil');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log(' Upload request received');

    const imageKey = `uploads/${req.file.originalname}`;
    console.log(' Image key:', imageKey);

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
    console.log(' Uploaded to S3:', result.Location);

    const detectedText = await extractTextFromS3Image(
      'productimages2025',
      imageKey
    );
    console.log('OCR text extracted');

    const gradedIngredients = gradeIngredients(detectedText);
    console.log('Ingredients graded:', gradedIngredients);

    const imageData = new ImageModel({
      originalFilename: req.file.originalname,
      imageKey,
      s3Url: result.Location,
      extractedText: detectedText,
      gradedIngredients,
    });

    await imageData.save();
    console.log(' Data saved to MongoDB');

    res.json({
      message: 'Upload + OCR + Grading successful',
      filename: imageKey,
      url: result.Location,
      text: detectedText,
      gradedIngredients,
    });

  } catch (err) {
    console.error('🔥 Upload Error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
