import { useRef, useEffect, useState, useCallback } from 'react';
import './Whiteboard.css'; // Component-specific styles

const RECT_STROKE_COLOR = '#4285f4'; // Google Blue
const TEXT_COLOR = '#34a853'; // Google Green
const SELECT_COLOR = 'rgba(66, 133, 244, 0.7)'; // Semi-transparent blue for selection

const RESIZE_HANDLE_SIZE = 8;

function DrawingCanvas({ elements, drawingMode, selectedElement, addElement, updateElement, setSelectedElement }) {
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);
    const isMoving = useRef(false);
    const isResizing = useRef(null); // 'br' for bottom-right resize
    const lastMousePos = useRef({ x: 0, y: 0 });

    // Function to draw all elements on the canvas
    const drawElements = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

        elements.forEach(element => {
            if (element.type === 'rectangle') {
                ctx.strokeStyle = element.color;
                ctx.lineWidth = element.lineWidth;
                ctx.strokeRect(element.x, element.y, element.width, element.height);
            } else if (element.type === 'text') {
                ctx.font = `${element.fontSize}px ${element.font}`;
                ctx.fillStyle = element.color;
                ctx.fillText(element.text, element.x, element.y + element.fontSize * 0.75); // Adjust Y for baseline
            }
        });

        // Draw selection outline and resize handle if an element is selected
        if (selectedElement) {
            ctx.strokeStyle = SELECT_COLOR;
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]); // Dashed line
            if (selectedElement.type === 'rectangle') {
                ctx.strokeRect(selectedElement.x, selectedElement.y, selectedElement.width, selectedElement.height);
                // Draw resize handle
                ctx.fillStyle = SELECT_COLOR;
                ctx.fillRect(
                    selectedElement.x + selectedElement.width - RESIZE_HANDLE_SIZE / 2,
                    selectedElement.y + selectedElement.height - RESIZE_HANDLE_SIZE / 2,
                    RESIZE_HANDLE_SIZE,
                    RESIZE_HANDLE_SIZE
                );
            } else if (selectedElement.type === 'text') {
                // For text, draw a box around it to indicate selection
                const textMetrics = ctx.measureText(selectedElement.text);
                const textWidth = textMetrics.width;
                const textHeight = selectedElement.fontSize;
                ctx.strokeRect(selectedElement.x, selectedElement.y, textWidth, textHeight);

                // Draw resize handle for text (bottom-right)
                ctx.fillStyle = SELECT_COLOR;
                ctx.fillRect(
                    selectedElement.x + textWidth - RESIZE_HANDLE_SIZE / 2,
                    selectedElement.y + textHeight - RESIZE_HANDLE_SIZE / 2,
                    RESIZE_HANDLE_SIZE,
                    RESIZE_HANDLE_SIZE
                );
            }
            ctx.setLineDash([]); // Reset line dash
        }
    }, [elements, selectedElement]);

    // Handle canvas initialization and redrawing
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        drawElements();
    }, [drawElements]);

    // Helper to get mouse coordinates relative to canvas
    const getMouseCoords = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    // Helper to check if a point is inside an element's bounds
    const isPointInElement = (x, y, element) => {
        if (element.type === 'rectangle') {
            return (
                x >= element.x &&
                x <= element.x + element.width &&
                y >= element.y &&
                y <= element.y + element.height
            );
        } else if (element.type === 'text') {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.font = `${element.fontSize}px ${element.font}`;
            const textMetrics = ctx.measureText(element.text);
            const textWidth = textMetrics.width;
            const textHeight = element.fontSize; // Approximation

            return (
                x >= element.x &&
                x <= element.x + textWidth &&
                y >= element.y && // Adjusted for text baseline
                y <= element.y + textHeight
            );
        }
        return false;
    };

    // Helper to check if a point is inside a resize handle
    const isPointInResizeHandle = (x, y, element) => {
        if (!element) return false;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let elementWidth = 0;
        let elementHeight = 0;

        if (element.type === 'rectangle') {
            elementWidth = element.width;
            elementHeight = element.height;
        } else if (element.type === 'text') {
            ctx.font = `${element.fontSize}px ${element.font}`;
            const textMetrics = ctx.measureText(element.text);
            elementWidth = textMetrics.width;
            elementHeight = selectedElement.fontSize; // Approximation
        } else {
            return false; // Only rectangles and texts are resizable for now
        }

        const handleX = element.x + elementWidth - RESIZE_HANDLE_SIZE / 2;
        const handleY = element.y + elementHeight - RESIZE_HANDLE_SIZE / 2;

        return (
            x >= handleX &&
            x <= handleX + RESIZE_HANDLE_SIZE &&
            y >= handleY &&
            y <= handleY + RESIZE_HANDLE_SIZE
        );
    };

    // --- Mouse Event Handlers ---

    const handleMouseDown = (e) => {
        const { x, y } = getMouseCoords(e);
        lastMousePos.current = { x, y };

        if (drawingMode === 'rectangle') {
            isDrawing.current = true;
            const newRect = {
                id: Date.now().toString(),
                type: 'rectangle',
                x,
                y,
                width: 0,
                height: 0,
                color: RECT_STROKE_COLOR,
                lineWidth: 2,
            };
            addElement(newRect);
            setSelectedElement(newRect);
        } else if (drawingMode === 'text') {
            // Prompt for text input
            const textInput = prompt("Enter text for the whiteboard:");
            if (textInput) {
                const newText = {
                    id: Date.now().toString(),
                    type: 'text',
                    x,
                    y,
                    text: textInput,
                    color: TEXT_COLOR,
                    fontSize: 24,
                    font: 'sans-serif',
                };
                addElement(newText);
                setSelectedElement(newText);
            }
        } else if (drawingMode === 'select') {
            if (selectedElement && isPointInResizeHandle(x, y, selectedElement)) {
                isResizing.current = 'br'; // Bottom-right handle
                isMoving.current = false;
            } else {
                // Check if clicked on an existing element
                let clickedElement = null;
                // Iterate in reverse to select elements on top
                for (let i = elements.length - 1; i >= 0; i--) {
                    if (isPointInElement(x, y, elements[i])) {
                        clickedElement = elements[i];
                        break;
                    }
                }

                if (clickedElement) {
                    setSelectedElement(clickedElement);
                    isMoving.current = true;
                } else {
                    setSelectedElement(null); // Deselect if clicked outside
                }
                isResizing.current = null;
            }
        }
        drawElements(); // Redraw immediately to show selection/start drawing feedback
    };

    const handleMouseMove = (e) => {
        const { x, y } = getMouseCoords(e);
        const dx = x - lastMousePos.current.x;
        const dy = y - lastMousePos.current.y;
        lastMousePos.current = { x, y };

        if (isDrawing.current && drawingMode === 'rectangle' && selectedElement) {
            // Update the rectangle being drawn
            const updatedRect = { ...selectedElement };
            updatedRect.width = x - updatedRect.x;
            updatedRect.height = y - updatedRect.y;
            updateElement(updatedRect);
        } else if (isMoving.current && selectedElement) {
            // Move the selected element
            const updatedElement = { ...selectedElement };
            updatedElement.x += dx;
            updatedElement.y += dy;
            updateElement(updatedElement);
        } else if (isResizing.current && selectedElement) {
            // Resize the selected element (only bottom-right for now)
            const updatedElement = { ...selectedElement };
            if (updatedElement.type === 'rectangle') {
                updatedElement.width += dx;
                updatedElement.height += dy;
                updatedElement.width = Math.max(10, updatedElement.width); // Min size
                updatedElement.height = Math.max(10, updatedElement.height); // Min size
            } else if (updatedElement.type === 'text') {
                // Simple resizing for text by adjusting font size
                const newFontSize = Math.max(10, selectedElement.fontSize + dy / 5); // Adjust sensitivity
                updatedElement.fontSize = newFontSize;
            }
            updateElement(updatedElement);
        }
        drawElements(); // Redraw frequently during interaction
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
        isMoving.current = false;
        isResizing.current = null;
        drawElements(); // Final redraw
    };

    return (
        <canvas
            ref={canvasRef}
            className="drawing-canvas"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // Stop drawing if mouse leaves canvas
        ></canvas>
    );
}

export default DrawingCanvas;