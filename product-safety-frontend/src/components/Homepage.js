// Home.js
import React, { useEffect, useState } from 'react';
import foodImg from '../assets/images/pizza-3010062_1920.jpg';
import personalCareImg from '../assets/images/hair-care-4541744_1920.jpg';
import cosmeticsImg from '../assets/images/cosmetics-9086984_1920.jpg';
import chatbotIcon from '../assets/images/robot-4363354_1280.png'; // fixed path
import Chatbot from './chatbot'; // chatbot component
import './Homepage.css';
import './chatbot.css'; // make sure you import this

const categories = [
  { name: 'Food', image: foodImg, path: 'food', description: 'Assess food safety & quality' },
  { name: 'Personal Care', image: personalCareImg, path: 'personal-care', description: 'Analyze care products' },
  { name: 'Cosmetics', image: cosmeticsImg, path: 'cosmetics', description: 'Verify cosmetic standards' },
];

const Home = ({ onCategorySelect }) => {
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    categories.forEach((category) => {
      const img = new Image();
      img.src = category.image;
    });
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Product Safety Analyzer</h1>
        <p className="hero-subtitle">Next-gen AI for product transparency</p>
        <div className="feature-bar">
          <span className="feature-item">Real-Time Insights</span>
          <span className="feature-item">Precision Analysis</span>
          <span className="feature-item">Trusted Results</span>
        </div>
      </div>

      {/* Categories */}
      <div className="categories-section">
        <div className="container">
          <h2 className="categories-title">Unlock Safety Insights</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <div
                key={category.name}
                className="category-card"
                onClick={() => onCategorySelect(category.path)}
              >
                <img src={category.image} alt={category.name} loading="lazy" />
                <div className="category-overlay">
                  <h3 className="category-title">{category.name}</h3>
                  <p className="category-desc">{category.description}</p>
                  <button className="btn-analyze">Analyze Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chatbot Icon */}
      <div className="chatbot-icon" onClick={() => setShowChatbot(!showChatbot)}>
        <img src={chatbotIcon} alt="Chatbot" />
      </div>

      {/* Chatbot Window */}
      {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
    </div>
  );
};

export default Home;
