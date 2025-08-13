import { useState, useCallback } from 'react';

function useWhiteboard() {
    const [elements, setElements] = useState([]);
    const [drawingMode, setDrawingMode] = useState('select'); // 'select', 'rectangle', 'text'
    const [selectedElement, setSelectedElement] = useState(null); // The currently selected element object

    // Add a new element to the whiteboard
    const addElement = useCallback((newElement) => {
        setElements(prevElements => [...prevElements, newElement]);
    }, []);

    // Update an existing element by its ID
    const updateElement = useCallback((updatedElement) => {
        setElements(prevElements =>
            prevElements.map(el => (el.id === updatedElement.id ? updatedElement : el))
        );
        // Also update the selected element reference if it's the one being updated
        setSelectedElement(updatedElement);
    }, []);

    // Set the selected element by its full object (for easier manipulation)
    const selectElement = useCallback((element) => {
        setSelectedElement(element);
    }, []);

    return {
        elements,
        drawingMode,
        selectedElement,
        setDrawingMode,
        addElement,
        updateElement,
        setSelectedElement: selectElement, // Alias for clarity
    };
}

export default useWhiteboard;