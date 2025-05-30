import React from 'react';
import { useNavigate } from 'react-router-dom';
import foodImg from '../images/pizza-3010062_1920.jpg';
import personalCareImg from '../images/hair-care-4541744_1920.jpg';
import cosmeticsImg from '../images/cosmetics-9086984_1920.jpg';

const categories = [
  { name: 'Food', image: foodImg, path: '/food' },
  { name: 'Personal Care', image: personalCareImg, path: '/personal-care' },
  { name: 'Cosmetics', image: cosmeticsImg, path: '/cosmetics' },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="categories-container">
      <div className="container">
        <h2 className="categories-title">Explore Categories</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-card"
              onClick={() => navigate(category.path)}
            >
              <img src={category.image} alt={category.name} />
              <p className="category-name">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;