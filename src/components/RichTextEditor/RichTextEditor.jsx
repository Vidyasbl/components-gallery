import React from 'react';
import useEditor from './useEditor';
import EditorToolbar from './EditorToolbar';
import './RichTextEditor.css'; // Component-specific styles

function RichTextEditor() {
    // Initial content for the editor
    const initialContent = `<p>Start typing your content here...</p><p>This is a <strong>bold</strong> word and this is <em>italic</em>. You can also <span style="text-decoration: underline;">underline</span> text.</p><h2>This is a Heading 2</h2><p>Feel free to experiment with the formatting options above.</p>`;

    // You could also manage the content state at a higher level if needed
    const handleContentChange = (newContent) => {
        // console.log("Editor content changed:", newContent);
        // In a real application, you would save this content to state or send it to an API
    };

    return (
        <div className="editor-app-container">
            <h1 className="editor-app-title">Simple Rich Text Editor</h1>
            <RichTextEditorBody initialContent={initialContent} onContentChange={handleContentChange} />
            <div className="editor-footer-note">
                <p>A basic rich text editor built with React and document.execCommand.</p>
            </div>
        </div>
    );
}

export default RichTextEditor;

function RichTextEditorBody({ initialContent, onContentChange }) {
    // Use the custom hook to manage editor state and actions
    const { editorRef, content, handleInput, handleSelectionChange, applyFormatting, isCommandActive } = useEditor(initialContent);

    // Effect to call the parent's onContentChange whenever the editor's content updates
    React.useEffect(() => {
        onContentChange(content);
    }, [content, onContentChange]);

    return (
        <div className="editor-wrapper">
            <EditorToolbar applyFormatting={applyFormatting} isCommandActive={isCommandActive} />
            <div
                ref={editorRef}
                className="editor-content"
                contentEditable="true" // Makes the div editable
                onInput={handleInput} // Capture input events to update content state
                onKeyUp={handleSelectionChange} // Update selection state on key up
                onMouseUp={handleSelectionChange} // Update selection state on mouse up (for selection changes)
            >
                {/* dangerouslySetInnerHTML is used to render HTML content */}
            </div>
        </div>
    );
}

// export default RichTextEditor;