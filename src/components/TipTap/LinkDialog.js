import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { Link as LinkIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const CustomSelect = styled(Select)(({ theme }) => ({
  color: theme.palette.text.primary,
  "& .MuiSelect-icon": {
    color: theme.palette.action.active,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.divider,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
}));

const LinkDialog = ({ open, onClose, onSubmit, editor, initialUrl = "" }) => {
  const [url, setUrl] = useState("https://");
  const [selectedText, setSelectedText] = useState("");
  const [linkType, setLinkType] = useState("internal");

  useEffect(() => {
    if (open) {
      if (editor.isActive("link")) {
        const attrs = editor.getAttributes("link");
        setLinkType(attrs.linkType || "internal");
        setUrl(attrs.href || "");
      } else {
        setLinkType("internal");
        setUrl("/");
      }

      const text = editor.state.selection.empty
        ? ""
        : editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to
          );
      setSelectedText(text);
    }
  }, [open, editor]);

  // Add this effect to handle URL prefix changes when link type changes
  useEffect(() => {
    if (linkType === "internal") {
      setUrl((prevUrl) =>
        prevUrl.startsWith("/")
          ? prevUrl
          : "/" + prevUrl.replace(/^https?:\/\//, "")
      );
    } else {
      setUrl((prevUrl) =>
        prevUrl.startsWith("http")
          ? prevUrl
          : "https://" + prevUrl.replace(/^\//, "")
      );
    }
  }, [linkType]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let finalUrl = url;
    let rel = "";
    let target = "";

    if (linkType === "internal") {
      finalUrl = url.startsWith("/") ? url : "/" + url;
      // No target or rel for internal links
    } else {
      if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
        finalUrl = "https://" + finalUrl;
      }
      rel = "noopener noreferrer";
      target = "_blank";

      if (linkType === "affiliate") {
        rel = "sponsored noopener noreferrer";
      }
    }

    // Use null instead of empty string to remove attributes
    const linkAttrs = {
      href: finalUrl,
      rel: rel || null,
      target: target || null,
      linkType,
    };

    onSubmit(finalUrl, linkType, rel, target);

    if (editor?.isActive("link")) {
      editor.chain().focus().setLink(linkAttrs).run();
    }

    setUrl(linkType === "internal" ? "" : "https://");
    setLinkType("external");
    onClose();
  };

  const handleRemoveLink = () => {
    editor.chain().focus().unsetLink().run();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      disableEnforceFocus={false}
      disableRestoreFocus={false}
      autoFocus={true}
      aria-labelledby="link-dialog-title"
      slotProps={{
        paper: {
          sx: {
            backgroundColor: "background.paper",
            color: "text.primary",
          },
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle
          id="link-dialog-title"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <LinkIcon />
          {editor?.isActive("link") ? "Edit Link" : "Insert Link"}
        </DialogTitle>
        <DialogContent>
          {selectedText && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Selected Text:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  p: 1,
                  backgroundColor: "action.hover",
                  borderRadius: 1,
                  wordBreak: "break-all",
                }}
              >
                {selectedText}
              </Typography>
            </Box>
          )}
          <TextField
            autoFocus
            margin="dense"
            label={linkType === "internal" ? "Path" : "URL"}
            type={linkType === "internal" ? "text" : "url"}
            fullWidth
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            id="link-url-input"
            name="url"
            aria-describedby="url-helper-text"
            helperText={
              linkType === "internal"
                ? "Enter page path (e.g., '/about') or full URL"
                : "Enter full URL including https://"
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "text.primary",
                "& fieldset": {
                  borderColor: "divider",
                },
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
              },
              "& .MuiInputLabel-root": {
                color: "text.secondary",
              },
              "& .MuiFormHelperText-root": {
                color: "text.secondary",
              },
            }}
          />
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ color: "text.primary" }}>Link Type</Typography>
            <CustomSelect
              value={linkType}
              onChange={(e) => setLinkType(e.target.value)}
              sx={{ ml: 2 }}
            >
              <MenuItem value="internal">Internal</MenuItem>
              <MenuItem value="external">External</MenuItem>
              <MenuItem value="affiliate">Affiliate</MenuItem>
            </CustomSelect>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} sx={{ color: "text.secondary" }}>
            Cancel
          </Button>
          {editor?.isActive("link") && (
            <Button
              onClick={handleRemoveLink}
              sx={{ color: "error.main" }}
              id="remove-link-button"
            >
              Remove Link
            </Button>
          )}
          <Button type="submit" variant="contained" id="submit-link-button">
            {editor?.isActive("link") ? "Update Link" : "Add Link"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LinkDialog;
