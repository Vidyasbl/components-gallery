import './Whiteboard.css'; // Component-specific styles

function Toolbar({ drawingMode, setDrawingMode }) {
    return (
        <div className="toolbar-container">
            <button
                onClick={() => setDrawingMode('select')}
                className={`toolbar-button ${drawingMode === 'select' ? 'active' : ''}`}
                title="Select/Move"
            >
                Select
            </button>
            <button
                onClick={() => setDrawingMode('rectangle')}
                className={`toolbar-button ${drawingMode === 'rectangle' ? 'active' : ''}`}
                title="Draw Rectangle"
            >
                Rectangle
            </button>
            <button
                onClick={() => setDrawingMode('text')}
                className={`toolbar-button ${drawingMode === 'text' ? 'active' : ''}`}
                title="Add Text"
            >
                Text
            </button>
        </div>
    );
}

export default Toolbar;