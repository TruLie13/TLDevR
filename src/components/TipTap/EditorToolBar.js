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

const EditorToolbar = ({ editor, handleCodeBlock, setLinkDialogOpen }) => {
  const handleLinkClick = () => {
    setLinkDialogOpen(true);
  };

  const isInCodeBlock = () => {
    return editor.isActive("codeBlock");
  };

  const buttonConfigs = [
    {
      action: () => editor.chain().focus().toggleBold().run(),
      disabled:
        !editor.can().chain().focus().toggleBold().run() || isInCodeBlock(),
      active: editor.isActive("bold"),
      label: "Bold",
      shortcut: "⌘B",
      icon: <FormatBold />,
    },
    {
      action: () => editor.chain().focus().toggleItalic().run(),
      disabled:
        !editor.can().chain().focus().toggleItalic().run() || isInCodeBlock(),
      active: editor.isActive("italic"),
      label: "Italic",
      shortcut: "⌘I",
      icon: <FormatItalic />,
    },
    {
      action: () => editor.chain().focus().toggleUnderline().run(),
      disabled:
        !editor.can().chain().focus().toggleUnderline().run() ||
        isInCodeBlock(),
      active: editor.isActive("underline"),
      label: "Underline",
      shortcut: "⌘U",
      icon: <FormatUnderlined />,
    },
    {
      action: () => editor.chain().focus().toggleStrike().run(),
      disabled:
        !editor.can().chain().focus().toggleStrike().run() || isInCodeBlock(),
      active: editor.isActive("strike"),
      label: "Strike",
      shortcut: "⌘⇧X",
      icon: <StrikethroughS />,
    },
    {
      action: handleCodeBlock,
      disabled: false,
      active: editor.isActive("codeBlock"),
      label: "Code",
      shortcut: "⌘⌥C",
      icon: <Code />,
    },
    {
      action: handleLinkClick,
      disabled: isInCodeBlock(),
      active: editor.isActive("link"),
      label: "Link",
      shortcut: "⌘K",
      icon: <LinkIcon />,
    },
  ];

  const ButtonWithOptionalTooltip = ({ button }) => {
    const handleClick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      button.action();
    };

    const ButtonComponent = (
      <Button
        onMouseDown={handleClick}
        disabled={button.disabled}
        variant={button.active ? "contained" : "outlined"}
        sx={{ marginRight: 1 }}
        startIcon={button.icon}
      >
        {button.label}
      </Button>
    );

    if (button.disabled) {
      return ButtonComponent;
    }

    return (
      <Tooltip
        title={
          <div>
            {button.label}
            <span
              style={{
                opacity: 0.7,
                fontSize: "0.9em",
                marginLeft: "8px",
                borderLeft: "1px solid rgba(255,255,255,0.3)",
                paddingLeft: "8px",
              }}
            >
              {button.shortcut}
            </span>
          </div>
        }
      >
        {ButtonComponent}
      </Tooltip>
    );
  };

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
          <ButtonWithOptionalTooltip button={button} />
        </Box>
      ))}
    </Box>
  );
};

export default EditorToolbar;
