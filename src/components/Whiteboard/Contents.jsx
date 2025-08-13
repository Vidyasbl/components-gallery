import useWhiteboard from './useWhiteboard';
import DrawingCanvas from './DrawingCanvas';
import Toolbar from './Toolbar';
import './Whiteboard.css'; // Component-specific styles

function Contents() {
    const {
        elements,
        drawingMode,
        selectedElement,
        setDrawingMode,
        addElement,
        updateElement,
        setSelectedElement,
    } = useWhiteboard();

    return (
        <div className="whiteboard-wrapper">
            <Toolbar drawingMode={drawingMode} setDrawingMode={setDrawingMode} />
            <DrawingCanvas
                elements={elements}
                drawingMode={drawingMode}
                selectedElement={selectedElement}
                addElement={addElement}
                updateElement={updateElement}
                setSelectedElement={setSelectedElement}
            />
        </div>
    );
}

export default Contents;