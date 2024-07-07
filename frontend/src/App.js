// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import Home from './Home';
import Hours from './Hours';
import Books from './Books';
import Feedback from './Feedback';
import SideMenu from './SideMenu'; // Import the SideMenu component
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <SideMenu />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/hours" element={<Hours />} />
            <Route path="/books" element={<Books />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
