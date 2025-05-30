const fs = require('fs');
const path = require('path');

// Load the JSON with grades
const gradingData = JSON.parse(
  fs.readFileSync(
    './ingredientgrades.json',
    'utf-8'
  )
);

/**
 * Converts raw OCR text into a graded list
 * @param {string} ocrText
 * @returns {Array<{ name: string, grade: string }>}
 */
function gradeIngredients(ocrText) {
  if (!ocrText) return [];

  const rawIngredients = ocrText
    .split(/[,;\n]/)
    .map(ing => ing.trim())
    .filter(Boolean);

  const graded = rawIngredients.map(name => {
    const normalized = name.toLowerCase();
    const matchedKey = Object.keys(gradingData).find(
      key => key.toLowerCase() === normalized
    );

    return {
      name,
      grade: matchedKey ? gradingData[matchedKey].toString() : 'Unknown'
    };
  });

  return graded;
}

module.exports = { gradeIngredients };
