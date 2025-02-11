"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import CodeBlock from "@tiptap/extension-code-block";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import { Button } from "@mui/material";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Link, Bold, Italic, Underline, Strike, CodeBlock],
    content: "<p>Hello World! 🌎️</p>",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-blue-300 rounded-md p-4">
      {/* Toolbar */}
      <div className="flex gap-2 mb-2">
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
          onClick={() => editor.chain().focus().toggleCode().run()}
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
      <EditorContent editor={editor} className="bg-black p-2 rounded-md" />
    </div>
  );
};

export default Tiptap;
