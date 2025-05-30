import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResultCard from './ResultCard';
import './ImageUpload.css';

function ImageUpload({ category, onClose }) {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [gradedIngredients, setGradedIngredients] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Prevent body scrolling when results are shown
  useEffect(() => {
    if (showResults) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showResults]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreviewURL(URL.createObjectURL(selected));
    setUploadMessage('');
    setGradedIngredients([]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await axios.post(`http://localhost:5000/upload?category=${category}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const { filename, gradedIngredients } = res.data;
      setUploadMessage(`✅ Uploaded: ${filename}`);
      setGradedIngredients(gradedIngredients || []);
      setShowResults(true);
    } catch (err) {
      setUploadMessage('❌ Upload failed');
    }
  };

  if (showResults) {
    return (
      <div className="results-overlay">
        <ResultCard
          result={{
            url: previewURL,
            text: 'Extracted ingredients here', // Replace with actual text if available
            gradedIngredients,
          }}
        />
        <button className="close-results" onClick={() => setShowResults(false)}>
          Back to Upload
        </button>
      </div>
    );
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="popup-title">{category.charAt(0).toUpperCase() + category.slice(1)} Analysis</h2>
        <label className="file-input-label">
          Choose Image
          <input type="file" onChange={handleFileChange} className="file-input" />
        </label>
        {previewURL && (
          <div className="preview-container">
            <img src={previewURL} alt="Preview" className="preview-image" />
          </div>
        )}
        <button className="upload-btn" onClick={handleUpload}>
          Upload & Analyze
        </button>
        {uploadMessage && (
          <p className={`upload-message ${uploadMessage.startsWith('✅') ? 'success' : 'error'}`}>
            {uploadMessage}
          </p>
        )}
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ImageUpload;