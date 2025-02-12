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
} from "@mui/material";
import { Link as LinkIcon } from "@mui/icons-material";

const LinkDialog = ({ open, onClose, onSubmit, editor, initialUrl = "" }) => {
  const [url, setUrl] = useState("https://");
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    if (open) {
      // If editing an existing link, use its URL
      if (editor.isActive("link")) {
        setUrl(editor.getAttributes("link").href);
      } else {
        setUrl("https://");
      }

      // Get selected text
      const text = editor.state.selection.empty
        ? ""
        : editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to
          );
      setSelectedText(text);
    }
  }, [open, editor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url);
    setUrl("https://");
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
      PaperProps={{
        sx: {
          backgroundColor: "rgb(21, 18, 43)",
          color: "white",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LinkIcon />
          {editor.isActive("link") ? "Edit Link" : "Insert Link"}
        </DialogTitle>
        <DialogContent>
          {selectedText && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="grey" sx={{ mb: 1 }}>
                Selected Text:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  p: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
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
            label="URL"
            type="url"
            fullWidth
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.23)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.4)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "rgba(255, 255, 255, 0.7)",
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Cancel
          </Button>
          {editor.isActive("link") && (
            <Button
              onClick={handleRemoveLink}
              sx={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Remove Link
            </Button>
          )}
          <Button type="submit" variant="contained">
            {editor.isActive("link") ? "Update Link" : "Add Link"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LinkDialog;
