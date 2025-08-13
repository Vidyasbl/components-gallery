import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { componentsData } from '../data/components';
import CountrySearch from '../components/CountrySearch/CountrySearch';
import TicTacToe from '../components/TicTacToe/TicTacToe';
import InfiniteScroll from '../components/InfiniteScroll/InfiniteScroll';
import KanbanBoard from '../components/KanbanBoard/KanbanBoard';
import Stopwatch from '../components/Stopwatch/Stopwatch';
import RichTextEditor from '../components/RichTextEditor/RichTextEditor';
import RichTextEditorTipTap from '../components/RichTextEditorTipTap/RichTextEditorTipTap';
import Whiteboard from '../components/Whiteboard/Whiteboard';
import Carousel from '../components/Carousel/Carousel';

const ComponentShowcase = () => {
  const { id } = useParams();
  const component = componentsData.find(comp => comp.id === id);

  if (!component) {
    return (
      <div className="showcase-container">
        <header className="header">
          <div className="header-content">
            <Link to="/" className="logo">
              🎨 Component Gallery
            </Link>
            <Link to="/" className="back-btn">
              ← Back to Gallery
            </Link>
          </div>
        </header>
        <div className="container">
          <h1>Component not found</h1>
        </div>
      </div>
    );
  }

  const renderComponent = () => {
    switch (component.id) {
      case 'country-search':
        return <CountrySearch />;
      case 'tic-tac-toe':
        return <TicTacToe />;
      case 'infinite-scroll':
        return <InfiniteScroll />;
      case 'kanban-board':
        return <KanbanBoard />;
      case 'stop-watch':
        return <Stopwatch />;
      case 'rich-text-editor-vanilla':
        return <RichTextEditor />;
      case 'rich-text-editor-tiptap':
        return <RichTextEditorTipTap />;
      case 'whiteboard':
        return <Whiteboard />;
      case 'carousel':
        return <Carousel />;
      default:
        return <div>Component not implemented yet</div>;
    }
  };

  return (
    <div className="showcase-container">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            🎨 Component Gallery
          </Link>
          <Link to="/" className="back-btn">
            ← Back to Gallery
          </Link>
        </div>
      </header>

      <div className="container">
        <div className="showcase-content">
          <div className="showcase-header">
            <h1>{component.name}</h1>
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
                <h4 className="tags-title">Technologies / Concepts used</h4>
                <div className="tags tech-tags">
                  {component.techTags.map(tag => (
                    <span key={tag} className="tag tech-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="component-demo">
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentShowcase;