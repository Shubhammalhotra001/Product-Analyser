import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResultCard from './ResultCard';
import ReuploadDialogue from './ReuploadDialogue';
import './ImageUpload.css';

function ImageUpload({ category, onClose }) {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [gradedIngredients, setGradedIngredients] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showReuploadDialogue, setShowReuploadDialogue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  // Prevent body scrolling when results are shown
  useEffect(() => {
    if (showResults || showReuploadDialogue) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showResults, showReuploadDialogue]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewURL(URL.createObjectURL(selected));
      setUploadMessage('');
      setGradedIngredients([]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const res = await axios.post(`${API_URL}/upload?category=${category}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const { filename, gradedIngredients } = res.data;
      setUploadMessage(`✅ Uploaded: ${filename}`);
      setGradedIngredients(gradedIngredients || []);
      
      // Check if 80% or more ingredients are unknown
      const totalIngredients = gradedIngredients.length;
      const unknownCount = gradedIngredients.filter(item => item.grade === 'Unknown').length;
      const unknownPercentage = (unknownCount / totalIngredients) * 100;
      
      if (unknownPercentage >= 80) {
        setShowReuploadDialogue(true);
      } else {
        setShowResults(true);
      }
    } catch (err) {
      setUploadMessage('❌ Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReupload = () => {
    // Reset state for reuploading
    setShowReuploadDialogue(false);
    setFile(null);
    setPreviewURL(null);
    setUploadMessage('');
    setGradedIngredients([]);
  };

  const handleViewResultsAnyway = () => {
    setShowReuploadDialogue(false);
    setShowResults(true);
  };

  // Show reupload dialogue
  if (showReuploadDialogue) {
    return (
      <ReuploadDialogue
        onReupload={handleReupload}
        onClose={handleViewResultsAnyway}
      />
    );
  }

  // Show results
  if (showResults) {
    return (
      <div className="results-overlay">
        <ResultCard
          result={{
            url: previewURL,
            text: 'Extracted ingredients here',
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
        
        <button 
          className="upload-btn" 
          onClick={handleUpload} 
          disabled={isLoading}
        >
          {isLoading ? <div className="loader"></div> : 'Upload & Analyze'}
        </button>
        
        {uploadMessage && (
          <p className={`upload-message ${uploadMessage.startsWith('✅') ? 'success' : 'error'}`}>
            {uploadMessage}
          </p>
        )}
        
        <button className="close-btn" onClick={onClose} disabled={isLoading}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ImageUpload;