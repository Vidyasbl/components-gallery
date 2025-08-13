import { useState, useEffect, useRef } from 'react';
import './Carousel.css';

const Carousel = () => {
    const technologies = [
        {
            id: 1,
            name: 'React',
            icon: '⚛️',
            color: '#61DAFB',
            description: 'A JavaScript library for building user interfaces'
        },
        {
            id: 2,
            name: 'Vue.js',
            icon: '💚',
            color: '#4FC08D',
            description: 'The Progressive JavaScript Framework'
        },
        {
            id: 3,
            name: 'Angular',
            icon: '🅰️',
            color: '#DD0031',
            description: 'Platform for building mobile and desktop applications'
        },
        {
            id: 4,
            name: 'JavaScript',
            icon: '🟨',
            color: '#F7DF1E',
            description: 'The language of the web'
        },
        {
            id: 5,
            name: 'TypeScript',
            icon: '🔷',
            color: '#3178C6',
            description: 'JavaScript with syntax for types'
        },
        {
            id: 6,
            name: 'CSS3',
            icon: '🎨',
            color: '#1572B6',
            description: 'Styling language for web pages'
        },
        {
            id: 7,
            name: 'HTML5',
            icon: '📄',
            color: '#E34F26',
            description: 'Markup language for web documents'
        },
        {
            id: 8,
            name: 'Node.js',
            icon: '🟢',
            color: '#339933',
            description: 'JavaScript runtime for server-side development'
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const intervalRef = useRef(null);

    // Auto-play functionality
    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === technologies.length - 1 ? 0 : prevIndex + 1
                );
            }, 4000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isPlaying, technologies.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        setCurrentIndex(currentIndex === 0 ? technologies.length - 1 : currentIndex - 1);
    };

    const goToNext = () => {
        setCurrentIndex(currentIndex === technologies.length - 1 ? 0 : currentIndex + 1);
    };

    const goToFirst = () => {
        setCurrentIndex(0);
    };

    const goToLast = () => {
        setCurrentIndex(technologies.length - 1);
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    // Touch handlers for mobile swipe
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            goToNext();
        } else if (isRightSwipe) {
            goToPrevious();
        }
    };

    return (
        <div className="carousel-container">
            <div className="carousel-header">
                <h2>Frontend Technologies</h2>
                <p>Explore modern web development tools</p>
            </div>

            <div
                className="carousel-wrapper"
                onMouseEnter={() => setIsPlaying(false)}
                onMouseLeave={() => setIsPlaying(true)}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {technologies.map((tech) => (
                        <div key={tech.id} className="carousel-slide">
                            <div className="slide-content" style={{ backgroundColor: tech.color + '15' }}>
                                <div className="tech-icon" style={{ color: tech.color }}>
                                    {tech.icon}
                                </div>
                                <div className="tech-info">
                                    <h3 style={{ color: tech.color }}>{tech.name}</h3>
                                    <p>{tech.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Simple Navigation Arrows */}
                <button className="nav-arrow prev" onClick={goToPrevious} aria-label="Previous">
                    ‹
                </button>
                <button className="nav-arrow next" onClick={goToNext} aria-label="Next">
                    ›
                </button>
            </div>

            {/* Simple Control Bar */}
            <div className="control-bar">
                <button className="control-btn" onClick={goToFirst} title="First">
                    ⏮
                </button>
                <button className="control-btn" onClick={goToPrevious} title="Previous">
                    ⏪
                </button>
                <button className="control-btn play-pause" onClick={togglePlayPause} title={isPlaying ? 'Pause' : 'Play'}>
                    {isPlaying ? '⏸' : '▶️'}
                </button>
                <button className="control-btn" onClick={goToNext} title="Next">
                    ⏩
                </button>
                <button className="control-btn" onClick={goToLast} title="Last">
                    ⏭
                </button>
            </div>

            {/* Indicators */}
            <div className="indicators">
                {technologies.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Counter */}
            <div className="counter">
                {currentIndex + 1} / {technologies.length}
            </div>
        </div>
    );
};

export default Carousel;