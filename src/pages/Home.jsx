import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { componentsData } from '../data/components';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredComponents = componentsData.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
    component.techTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="home">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            🎨 Component Gallery
          </Link>
        </div>
      </header>

      <div className="container">
        <section className="hero">
          <h1>Frontend Component Showcase</h1>
          <p>
            Explore a curated collection of React components built with modern web technologies.
            Each component demonstrates different patterns, interactions, and UI solutions.
          </p>
        </section>

        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search components by name or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="components-grid">
          {filteredComponents.map(component => (
            <Link
              key={component.id}
              to={`/component/${component.id}`}
              className="component-card"
            >
              <h3>{component.name}</h3>
              <p>{component.description}</p>

              <div className="tags-section">
                <div className="general-tags-container">
                  <div className="tags general-tags">
                    {component.tags.map(tag => (
                      <span key={tag} className="tag general-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="tech-tags-container">
                  <h4 className="tags-title">Technologies</h4>
                  <div className="tags tech-tags">
                    {component.techTags.map(tag => (
                      <span key={tag} className="tag tech-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;