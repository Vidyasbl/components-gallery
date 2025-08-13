import './RichTextEditor.css'; // Component-specific styles

function EditorToolbar({ applyFormatting, isCommandActive }) {
    return (
        <div className="editor-toolbar">
            {/* Bold Button */}
            <button
                onClick={() => applyFormatting('bold')}
                className={`toolbar-button ${isCommandActive('bold') ? 'active' : ''}`}
                title="Bold"
            >
                <strong>B</strong>
            </button>

            {/* Italic Button */}
            <button
                onClick={() => applyFormatting('italic')}
                className={`toolbar-button ${isCommandActive('italic') ? 'active' : ''}`}
                title="Italic"
            >
                <em>I</em>
            </button>

            {/* Underline Button */}
            <button
                onClick={() => applyFormatting('underline')}
                className={`toolbar-button ${isCommandActive('underline') ? 'active' : ''}`}
                title="Underline"
            >
                <u>U</u>
            </button>

            {/* Strikethrough Button */}
            <button
                onClick={() => applyFormatting('strikeThrough')}
                className={`toolbar-button ${isCommandActive('strikeThrough') ? 'active' : ''}`}
                title="Strikethrough"
            >
                <del>S</del>
            </button>

            {/* Heading 2 Button */}
            <button
                onClick={() => applyFormatting('formatBlock', 'H2')}
                className={`toolbar-button ${isCommandActive('formatBlock', 'H2') ? 'active' : ''}`}
                title="Heading 2"
            >
                H2
            </button>

            {/* Unordered List Button */}
            <button
                onClick={() => applyFormatting('insertUnorderedList')}
                className={`toolbar-button ${isCommandActive('insertUnorderedList') ? 'active' : ''}`}
                title="Unordered List"
            >
                &#x2022; List
            </button>

            {/* Ordered List Button */}
            <button
                onClick={() => applyFormatting('insertOrderedList')}
                className={`toolbar-button ${isCommandActive('insertOrderedList') ? 'active' : ''}`}
                title="Ordered List"
            >
                1. List
            </button>
        </div>
    );
}

export default EditorToolbar;