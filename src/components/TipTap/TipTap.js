"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { Card, Typography } from "@mui/material";
import EditorToolbar from "./EditorToolBar.js";
import Bold from "@tiptap/extension-bold";
import CodeBlock from "@tiptap/extension-code-block";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import "./styles.css";

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

const Tiptap = () => {
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
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  const handleCodeBlock = () => {
    const selection = editor.state.selection;

    if (!selection.empty) {
      // If text is selected, toggle the code block on the selection
      editor.chain().focus().toggleCodeBlock().run();
    } else {
      // If no text is selected, insert a new, empty code block at the cursor position
      editor
        .chain()
        .focus()
        .insertContent({ type: "codeBlock", content: [] }) // Insert an empty code block
        .run();
    }
  };

  return (
    <Card
      className="p-5"
      sx={{
        backgroundColor: "rgb(21, 18, 43)",
        width: "100%",
        color: "white",
        borderRadius: "1.5rem",
      }}
    >
      <Typography variant="h6" className="mb-5">
        Article Content
      </Typography>
      {/* Toolbar */}
      <EditorToolbar editor={editor} handleCodeBlock={handleCodeBlock} />

      {/* Text Editor */}
      <EditorContent editor={editor} />
    </Card>
  );
};

export default Tiptap;
