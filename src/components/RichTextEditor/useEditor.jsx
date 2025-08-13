import { useState, useRef, useEffect, useCallback } from 'react';

function useEditor(initialContent = '') {
    const editorRef = useRef(null);
    const [content, setContent] = useState(initialContent);
    const [selectionRange, setSelectionRange] = useState(null); // To store current text selection

    // Restore initial content when the component mounts
    useEffect(() => {
        if (editorRef.current && initialContent) {
            editorRef.current.innerHTML = initialContent;
        }
    }, [initialContent]);

    // Handle content changes in the editable div
    const handleInput = useCallback(() => {
        if (editorRef.current) {
            setContent(editorRef.current.innerHTML);
            // After input, ensure the selection is preserved or updated
            // This is crucial for execCommand to work correctly on subsequent clicks
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                setSelectionRange(selection.getRangeAt(0));
            }
        }
    }, []);

    // Update selection on mouse up and key up to reflect active formatting
    const handleSelectionChange = useCallback(() => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            setSelectionRange(selection.getRangeAt(0));
        } else {
            setSelectionRange(null);
        }
        // Force a re-render to update button active states
        // A simple state change like this is often needed to trigger a re-render
        // when only `document.queryCommandState` would change, which React doesn't track.
        setContent(editorRef.current ? editorRef.current.innerHTML : '');
    }, []);

    // Apply formatting using document.execCommand
    const applyFormatting = useCallback((command, value = null) => {
        if (editorRef.current) {
            // Focus the editor before executing command
            editorRef.current.focus();

            // If a range was previously saved, restore it before applying command
            if (selectionRange) {
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(selectionRange);
            }

            document.execCommand(command, false, value);

            // After command, update content and selection
            handleInput();
            handleSelectionChange(); // Update command states on buttons
        }
    }, [handleInput, handleSelectionChange, selectionRange]);

    // Check if a command is active for the current selection
    const isCommandActive = useCallback((command, value = null) => {
        if (editorRef.current) {
            if (value) {
                // For commands like formatBlock, we need to check the value
                // This is a basic check and might need refinement for complex cases
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    const parentNode = selection.getRangeAt(0).commonAncestorContainer;
                    return parentNode.nodeName === value.toUpperCase() ||
                        parentNode.parentNode.nodeName === value.toUpperCase();
                }
                return false;
            }
            return document.queryCommandState(command);
        }
        return false;
    }, []);

    // Set up event listeners for input and selection changes
    useEffect(() => {
        const editorElement = editorRef.current;
        if (editorElement) {
            editorElement.addEventListener('input', handleInput);
            // Listen for selection changes (e.g., when user selects text with mouse)
            // document.onselectionchange is a more reliable event for selection updates
            document.addEventListener('selectionchange', handleSelectionChange);
        }

        // Cleanup event listeners when component unmounts
        return () => {
            if (editorElement) {
                editorElement.removeEventListener('input', handleInput);
                document.removeEventListener('selectionchange', handleSelectionChange);
            }
        };
    }, [handleInput, handleSelectionChange]);


    return { editorRef, content, handleInput, handleSelectionChange, applyFormatting, isCommandActive };
}

export default useEditor;