"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import CodeBlock from "@tiptap/extension-code-block";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import { Button } from "@mui/material";
import { Extension } from "@tiptap/core";

// Custom extension to style the code block
const CustomCodeBlock = CodeBlock.extend({
  addAttributes() {
    return {
      class: {
        default: "custom-code-block",
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => {
          return {
            class: "custom-code-block",
          };
        },
      },
    };
  },
});

// Custom styles to be added to your CSS
const editorStyles = `
.ProseMirror {
  min-height: 200px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.custom-code-block {
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  padding: 12px;
  margin: 8px 0;
  position: relative;
  color: white;
  min-height: 24px;
}

.custom-code-block::before {
  content: 'Code';
  position: absolute;
  top: -10px;
  left: 8px;
  background-color: #1a1a1a;
  padding: 0 4px;
  font-size: 12px;
  color: #888;
  font-family: system-ui;
  border: 1px solid #333;
  border-radius: 2px;
}

.ProseMirror pre {
  margin: 8px 0;
}
`;

const Tiptap = () => {
  // Add styles to the document
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = editorStyles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default code block to use our custom one
      }),
      Link,
      Bold,
      Italic,
      Underline,
      Strike,
      CustomCodeBlock,
    ],
    content: "Hello World! 🌎️",
  });

  if (!editor) {
    return null;
  }

  const handleCodeBlock = () => {
    const selection = editor.state.selection;

    if (!selection.empty) {
      // If text is selected, wrap it in a code block
      editor.chain().focus().toggleCodeBlock().run();
    } else {
      // If no text is selected, insert a new code block at the current position
      editor
        .chain()
        .focus()
        .insertContent({
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "\n",
            },
          ],
        })
        .setCodeBlock()
        .run();
    }
  };

  return (
    <div>
      {/* Toolbar */}
      <div style={{ marginBottom: "1rem" }}>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          variant={editor.isActive("bold") ? "contained" : "outlined"}
        >
          Bold
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          variant={editor.isActive("italic") ? "contained" : "outlined"}
        >
          Italic
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          variant={editor.isActive("underline") ? "contained" : "outlined"}
        >
          Underline
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          variant={editor.isActive("strike") ? "contained" : "outlined"}
        >
          Strike
        </Button>
        <Button
          onClick={handleCodeBlock}
          variant={editor.isActive("codeBlock") ? "contained" : "outlined"}
        >
          Code
        </Button>
        <Button
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          variant="outlined"
        >
          Link
        </Button>
      </div>

      {/* Text Editor */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
