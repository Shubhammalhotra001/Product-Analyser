// rekognitionUtil.js

require('dotenv').config();
const { RekognitionClient, DetectTextCommand } = require('@aws-sdk/client-rekognition');

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.error("❌ AWS credentials are missing! Check your .env file");
}

const rekognitionClient = new RekognitionClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function extractTextFromS3Image(bucket, key) {
  const command = new DetectTextCommand({
    Image: {
      S3Object: {
        Bucket: bucket,
        Name: key,
      },
    },
  });

  const response = await rekognitionClient.send(command);
  const detectedText = response.TextDetections
    .filter(d => d.Type === 'LINE' && d.Confidence > 85)
    .map(d => d.DetectedText)
    .join('\n');

  return detectedText;
}

module.exports = { extractTextFromS3Image };
