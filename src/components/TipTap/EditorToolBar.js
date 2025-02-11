import React from "react";
import { Button, Tooltip, Box } from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  StrikethroughS,
  Code,
  Link as LinkIcon,
} from "@mui/icons-material";

const EditorToolbar = ({ editor, handleCodeBlock }) => {
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
      action: () => {
        const url = prompt("Enter URL:");
        if (url) {
          editor.chain().focus().setLink({ href: url }).run();
        }
      },
      disabled: false,
      active: false, // No "active" state for Link
      label: "Link",
      icon: <LinkIcon />,
    },
  ];

  return (
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
  );
};

export default EditorToolbar;
