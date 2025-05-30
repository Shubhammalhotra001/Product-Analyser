// classifyText.js

function classifyText(text) {
    const lowerText = text.toLowerCase();
  
    if (lowerText.includes('glycerin') || lowerText.includes('apply to skin')) return 'skincare';
    if (lowerText.includes('shampoo') || lowerText.includes('hair')) return 'haircare';
    if (lowerText.includes('vitamin') || lowerText.includes('tablet')) return 'medicine';
    if (lowerText.includes('sugar') || lowerText.includes('flour')) return 'food';
  
    return 'other';
  }
  
  module.exports = {classifyText};
  