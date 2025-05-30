import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageUpload from './components/ImageUpload';
import Home from './components/Homepage';
import './App.css';

function App() {
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpenPopup = (category) => {
    setSelectedCategory(category);
    setShowUploadPopup(true);
  };

  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Home onCategorySelect={handleOpenPopup} />} />
          <Route path="/upload/:category" element={<Home onCategorySelect={handleOpenPopup} />} />
        </Routes>
        {showUploadPopup && (
          <ImageUpload
            category={selectedCategory}
            onClose={() => setShowUploadPopup(false)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;