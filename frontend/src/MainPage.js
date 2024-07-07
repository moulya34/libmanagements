// MainPage.js

import React, { useState } from 'react';
import './MainPage.css';

const MainPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="main-container">
      <div className="header">
          
        
      </div>
      <div className="content">
        <h1>Library Management System</h1>
      </div>
    </div>
  );
};

export default MainPage;
