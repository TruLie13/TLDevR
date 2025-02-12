import React, { useState } from "react";
import { Button, Tooltip, Box } from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  StrikethroughS,
  Code,
  Link as LinkIcon,
} from "@mui/icons-material";
import LinkDialog from "./LinkDialog";

const EditorToolbar = ({ editor, handleCodeBlock }) => {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);

  const handleLinkSubmit = (url) => {
    if (editor.isActive("link")) {
      // Update existing link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } else {
      // Create new link
      if (editor.state.selection.empty) {
        // If no text is selected, insert the URL as the link text
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
        // If text is selected, convert it to a link
        editor.chain().focus().setLink({ href: url }).run();
      }
    }
  };

  const handleLinkClick = () => {
    // If a link is selected, open the dialog for editing
    if (editor.isActive("link")) {
      setLinkDialogOpen(true);
    } else {
      // If there's no link, check if text is selected
      if (editor.state.selection.empty) {
        // If no text is selected, just open the dialog
        setLinkDialogOpen(true);
      } else {
        // If text is selected, open the dialog to add a link
        setLinkDialogOpen(true);
      }
    }
  };

  const buttonConfigs = [
    {
      action: () => editor.chain().focus().toggleBold().run(),
      disabled: !editor.can().chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
      label: "Bold",
      icon: <FormatBold />,
    },
    {
      action: () => editor.chain().focus().toggleItalic().run(),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
      label: "Italic",
      icon: <FormatItalic />,
    },
    {
      action: () => editor.chain().focus().toggleUnderline().run(),
      disabled: !editor.can().chain().focus().toggleUnderline().run(),
      active: editor.isActive("underline"),
      label: "Underline",
      icon: <FormatUnderlined />,
    },
    {
      action: () => editor.chain().focus().toggleStrike().run(),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
      label: "Strike",
      icon: <StrikethroughS />,
    },
    {
      action: handleCodeBlock,
      disabled: false,
      active: editor.isActive("codeBlock"),
      label: "Code",
      icon: <Code />,
    },
    {
      action: handleLinkClick,
      disabled: false,
      active: editor.isActive("link"),
      label: "Link",
      icon: <LinkIcon />,
    },
  ];

  return (
    <>
      <Box
        sx={{
          marginBottom: "1rem",
          borderRadius: "8px",
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {buttonConfigs.map((button, index) => (
          <Box key={index}>
            <Tooltip title={button.label}>
              <Button
                onClick={button.action}
                disabled={button.disabled}
                variant={button.active ? "contained" : "outlined"}
                sx={{ marginRight: 1 }}
                startIcon={button.icon}
              >
                {button.label}
              </Button>
            </Tooltip>
          </Box>
        ))}
      </Box>

      <LinkDialog
        open={linkDialogOpen}
        onClose={() => setLinkDialogOpen(false)}
        onSubmit={handleLinkSubmit}
        editor={editor}
      />
    </>
  );
};

export default EditorToolbar;
