"use client";

import { Card, Typography } from "@mui/material";
import { Extension } from "@tiptap/core";
import CodeBlock from "@tiptap/extension-code-block";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import EditorToolbar from "./EditorToolBar.js";
import LinkDialog from "./LinkDialog";
import "./styles.css";

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

const Tiptap = ({ onChange }) => {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);

  // Custom keyboard shortcuts extension
  const CustomKeyboardShortcuts = Extension.create({
    name: "customKeyboardShortcuts",

    addKeyboardShortcuts() {
      return {
        "Mod-SHIFT-7": ({ editor }) =>
          editor.chain().focus().toggleOrderedList().run(),
        "Mod-Alt-h": ({ editor }) =>
          editor.chain().focus().toggleHeading({ level: 2 }).run(),
        "Mod-k": ({ editor }) => {
          // This will open your link dialog
          setLinkDialogOpen(true);
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        bulletList: {
          HTMLAttributes: {
            class: "my-custom-bullet-list",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "my-custom-ordered-list",
          },
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Underline,
      CustomCodeBlock,
      CustomKeyboardShortcuts,
    ],
    content: "<h2>Hello World! 🌎️</h2><p>This is a paragraph.</p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log("Editor content:", html);
      onChange?.(html);
    },
  });

  if (!editor) {
    return null;
  }

  const handleCodeBlock = () => {
    editor.chain().focus().toggleCodeBlock().run();
  };

  const handleLinkSubmit = (url, linkType = "regular") => {
    if (editor.isActive("link")) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
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
