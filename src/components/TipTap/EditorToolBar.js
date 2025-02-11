import React from "react";
import { Button } from "@mui/material";

const EditorToolbar = ({ editor, handleCodeBlock }) => {
  return (
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
  );
};

export default EditorToolbar;
