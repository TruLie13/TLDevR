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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Link as LinkIcon } from "@mui/icons-material";

const LinkDialog = ({ open, onClose, onSubmit, editor, initialUrl = "" }) => {
  const [url, setUrl] = useState("https://");
  const [selectedText, setSelectedText] = useState("");
  const [linkType, setLinkType] = useState("regular");

  useEffect(() => {
    if (open) {
      if (editor.isActive("link")) {
        const attrs = editor.getAttributes("link");
        setUrl(attrs.href || "https://");
        setLinkType(attrs.linkType || "regular");
      } else {
        setUrl("https://");
        setLinkType("regular");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url, linkType);
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
      disableEnforceFocus={false}
      disableRestoreFocus={false}
      autoFocus={true}
      aria-labelledby="link-dialog-title"
      PaperProps={{
        sx: {
          backgroundColor: "rgb(21, 18, 43)",
          color: "white",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle
          id="link-dialog-title"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
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
            // Add these attributes:
            id="link-url-input"
            name="url"
            aria-describedby="url-helper-text"
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
          <FormControl
            component="fieldset"
            sx={{ mt: 2, color: "white" }}
            // Add these attributes:
            id="link-type-control"
          >
            <FormLabel
              component="legend"
              sx={{ color: "rgba(255, 255, 255, 0.7)" }}
              // Add id for association:
              id="link-type-label"
            >
              Link Type
            </FormLabel>
            <RadioGroup
              value={linkType}
              onChange={(e) => setLinkType(e.target.value)}
              // Add these attributes:
              aria-labelledby="link-type-label"
              name="link-type"
            >
              <FormControlLabel
                value="regular"
                control={
                  <Radio
                    sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                    id="regular-link-radio"
                    name="link-type"
                  />
                }
                label="Regular Link"
              />
              <FormControlLabel
                value="affiliate"
                control={
                  <Radio
                    sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                    id="affiliate-link-radio"
                    name="link-type"
                  />
                }
                label="Affiliate Link"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Cancel
          </Button>
          {editor.isActive("link") && (
            <Button
              onClick={handleRemoveLink}
              sx={{ color: "rgba(255, 255, 255, 0.7)" }}
              // Add id for this button:
              id="remove-link-button"
            >
              Remove Link
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            // Add id for submit button:
            id="submit-link-button"
          >
            {editor.isActive("link") ? "Update Link" : "Add Link"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LinkDialog;
