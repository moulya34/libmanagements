// SideMenu.js

import React, { useState } from 'react';
import './SideMenu.css';

const SideMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <div className="menu-items">
          <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/hours" onClick={() => setMenuOpen(false)}>Working Hours</a>
          <a href="/books" onClick={() => setMenuOpen(false)}>Books</a>
          <a href="/feedback" onClick={() => setMenuOpen(false)}>Feedback</a>
          <a href="/home" onClick={() => setMenuOpen(false)}>Contact</a>

        </div>
      </div>
    </>
  );
};

export default SideMenu;
