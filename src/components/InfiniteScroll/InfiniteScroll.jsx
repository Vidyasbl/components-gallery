import React, { useState, useEffect, useRef, useCallback } from 'react';
import './InfiniteScroll.css';

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const loadingRef = useRef(null);

  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', 
    '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
  ];

  const generateItems = (startIndex, count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: startIndex + i,
      title: `Item ${startIndex + i + 1}`,
      description: `This is a description for item ${startIndex + i + 1}. It contains some sample text to demonstrate the infinite scroll functionality.`,
      color: colors[(startIndex + i) % colors.length]
    }));
  };

  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newItems = generateItems(items.length, 10);
    setItems(prevItems => [...prevItems, ...newItems]);
    
    // Stop loading after 100 items for demo purposes
    if (items.length >= 90) {
      setHasMore(false);
    }
    
    setLoading(false);
  }, [items.length, loading, hasMore]);

  useEffect(() => {
    // Load initial items
    const initialItems = generateItems(0, 20);
    setItems(initialItems);
  }, []);

  useEffect(() => {
    const currentLoadingRef = loadingRef.current;
    
    if (!currentLoadingRef) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          loadMoreItems();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '20px'
      }
    );

    observerRef.current.observe(currentLoadingRef);

    return () => {
      if (observerRef.current && currentLoadingRef) {
        observerRef.current.unobserve(currentLoadingRef);
      }
    };
  }, [loadMoreItems, hasMore, loading]);

  return (
    <div className="infinite-scroll">
      <div className="scroll-header">
        <h2>Infinite Scroll Demo</h2>
        <p>Scroll down to see more items load automatically using Intersection Observer API</p>
      </div>

      <div className="items-container">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="item-card"
            style={{ '--item-color': item.color }}
          >
            <div className="item-header">
              <div className="item-avatar" style={{ backgroundColor: item.color }}>
                {item.id + 1}
              </div>
              <h3>{item.title}</h3>
            </div>
            <p>{item.description}</p>
            <div className="item-footer">
              <span className="item-id">ID: {item.id + 1}</span>
              <span className="item-timestamp">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div ref={loadingRef} className="loading-container">
        {loading && hasMore && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <span>Loading more items...</span>
          </div>
        )}
        
        {!hasMore && (
          <div className="end-message">
            🎉 You've reached the end! No more items to load.
          </div>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;