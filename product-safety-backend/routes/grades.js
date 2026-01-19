const express = require('express');
const router = express.Router();
const { ImageModel } = require('../db');
const { gradeIngredients } = require('../gradeutil'); 

// GET /grade/:id
router.get('/:id', async (req, res) => {
  try {
    const imageId = req.params.id;

    //  Fetch image doc from MongoDB
    const imageData = await ImageModel.findById(imageId);
    if (!imageData) {
      return res.status(404).json({ error: 'Image not found' });
    }

    //  Grade ingredients using OCR text
    const graded = gradeIngredients(imageData.text); //  Correct function call

    //  Save back to MongoDB
    imageData.gradedIngredients = graded;
    await imageData.save();

    res.json({
      message: 'Ingredients graded and saved!',
      gradedIngredients: graded
    });

  } catch (err) {
    console.error('❌ Grading Error:', err);
    res.status(500).json({ error: 'Grading failed', details: err.message });
  }
});

module.exports = router;
