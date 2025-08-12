import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ComponentShowcase from './pages/ComponentShowcase';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/component/:id" element={<ComponentShowcase />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;