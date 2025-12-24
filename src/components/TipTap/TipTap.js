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
// import { background } from "@/lib/themeTokens";

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

const Tiptap = ({ onChange, initialContent = "" }) => {
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
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    editorProps: {
      attributes: {
        "aria-labelledby": "article-content-label",
      },
    },
    immediatelyRender: false,
  });

  const handleCodeBlock = () => {
    editor.chain().focus().toggleCodeBlock().run();
  };

  const handleLinkSubmit = (url, linkType = "regular") => {
    if (editor?.isActive("link")) {
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
      sx={{
        backgroundColor: "background.paper",
        width: "100%",
        color: "text.primary",
        borderRadius: "1.5rem",
        padding: "1.5rem",
        marginTop: "1.5rem",
        "& .ProseMirror": {
          minHeight: "200px",
          padding: "16px",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "4px",
          backgroundColor: "background.default",
          color: "text.primary",
          "&:focus": {
            outline: "none",
            borderColor: "primary.main",
          },
        },
        "& .ProseMirror blockquote": {
          borderLeft: "3px solid",
          borderColor: "text.secondary",
          paddingLeft: "1em",
          marginLeft: 0,
          fontStyle: "italic",
          color: "text.secondary",
        },
        "& .ProseMirror a": {
          color: "primary.main",
          textDecoration: "underline",
          cursor: "pointer",
          "&:hover": {
            color: "primary.dark",
          },
        },
        "& .ProseMirror h2": {
          fontSize: "1.5em",
          fontWeight: "bold",
          marginBottom: "0.5em",
          color: "text.primary",
        },
        "& .custom-code-block": {
          backgroundColor: "background.default",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "4px",
          fontFamily: "'Fira Code', monospace",
          padding: "12px",
          margin: "8px 0",
          position: "relative",
          color: "text.primary",
          minHeight: "24px",
        },
        "& .custom-code-block::before": {
          content: '"Code"',
          position: "absolute",
          top: "-10px",
          left: "8px",
          backgroundColor: "background.paper", // Use paper to stand out from default
          padding: "0 4px",
          fontSize: "12px",
          color: "text.secondary",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "2px",
        },
        "& .my-custom-bullet-list": {
          listStyleType: "disc",
          paddingLeft: "1.5em",
        },
        "& .my-custom-ordered-list": {
          listStyleType: "decimal",
          paddingLeft: "1.5em",
        },
        "& li": {
          marginBottom: "0.5em",
        },
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "1.5rem" }} id="article-content-label">
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
