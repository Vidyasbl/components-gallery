// src/RichTextEditorTipTap.jsx

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './RichTextEditorTipTap.css'; // We'll create this CSS file next

// Define the menu bar component for the editor
const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="menu-bar">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                Bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                Italic
            </button>
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'is-active' : ''}
            >
                Paragraph
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
                H1
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
                H2
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                Bullet List
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                Numbered List
            </button>
        </div>
    );
};

// Main editor component
const RichTextEditorTipTap = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: '<p>Hello world!</p>',
    });

    return (
        <div className="editor-container">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="editor-content" />
        </div>
    );
};

export default RichTextEditorTipTap;