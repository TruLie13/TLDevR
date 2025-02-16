"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState, useEffect } from "react";
import { Card, Typography } from "@mui/material";
import EditorToolbar from "./EditorToolBar.js";
import Bold from "@tiptap/extension-bold";
import CodeBlock from "@tiptap/extension-code-block";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import { Extension } from "@tiptap/core";
import LinkDialog from "./LinkDialog";
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

// Custom keyboard shortcut handler
const CustomKeyboardShortcuts = Extension.create({
  name: "customKeyboardShortcuts",

  addKeyboardShortcuts() {
    return {
      "Mod-Alt-c": ({ editor }) => {
        const selection = editor.state.selection;

        if (!selection.empty) {
          // If text is selected, toggle code block only on the selection
          return editor.chain().focus().toggleCodeBlock().run();
        } else {
          // If no text is selected, insert an empty code block at cursor position
          return editor
            .chain()
            .focus()
            .insertContent({ type: "codeBlock", content: [] })
            .run();
        }
      },
      // We'll handle Mod-k in the component with useEffect
    };
  },
});

const Tiptap = ({ onChange }) => {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default code block to use our custom one
      }),
      Link.configure({
        openOnClick: false, // Prevent opening links on click
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener", // Remove noreferrer and nofollow (helps with SEO and affiliate)
        },
      }),
      Bold,
      Italic,
      Underline,
      Strike,
      CustomCodeBlock,
      CustomKeyboardShortcuts, // Add custom keyboard shortcuts
    ],
    content: "Hello World! 🌎️",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML(); // Convert content to HTML
      onChange?.(html); // Pass updated content to parent component
    },
  });

  // Handle keyboard shortcut for link
  useEffect(() => {
    if (!editor) return;

    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setLinkDialogOpen(true);
      }
    };

    // Add event listener to the editor DOM element
    const editorElement = editor.view.dom;
    editorElement.addEventListener("keydown", handleKeyDown);

    // Clean up
    return () => {
      editorElement.removeEventListener("keydown", handleKeyDown);
    };
  }, [editor]);

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
        .insertContent({ type: "codeBlock", content: [] })
        .run();
    }
  };

  const handleLinkSubmit = (url) => {
    if (editor.isActive("link")) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } else {
      if (editor.state.selection.empty) {
        editor
          .chain()
          .focus()
          .insertContent({
            type: "text",
            marks: [{ type: "link", attrs: { href: url } }],
            text: url,
          })
          .run();
      } else {
        editor.chain().focus().setLink({ href: url }).run();
      }
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
      <EditorToolbar
        editor={editor}
        handleCodeBlock={handleCodeBlock}
        setLinkDialogOpen={setLinkDialogOpen}
      />
      <EditorContent editor={editor} />

      <LinkDialog
        open={linkDialogOpen}
        onClose={() => setLinkDialogOpen(false)}
        onSubmit={handleLinkSubmit}
        editor={editor}
      />
    </Card>
  );
};

export default Tiptap;
