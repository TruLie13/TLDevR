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
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Link as LinkIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase": {
    color: "grey",
    "&.Mui-checked": {
      color: "white",
    },
  },
  "& .MuiSwitch-track": {
    backgroundColor: "grey",
    "&.Mui-checked": {
      backgroundColor: "white",
    },
  },
}));

const LinkDialog = ({ open, onClose, onSubmit, editor, initialUrl = "" }) => {
  const [url, setUrl] = useState("https://");
  const [selectedText, setSelectedText] = useState("");
  const [isAffiliateLink, setIsAffiliateLink] = useState(false);

  useEffect(() => {
    if (open) {
      if (editor.isActive("link")) {
        const attrs = editor.getAttributes("link");
        setUrl(attrs.href || "https://");
        setIsAffiliateLink(attrs.linkType === "affiliate"); // Ensure correct state for affiliate toggle
      } else {
        setUrl("https://");
        setIsAffiliateLink(false);
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

    let finalUrl = url;

    // Only prepend "/" for internal links (not starting with "http://" or "https://")
    if (
      !isAffiliateLink &&
      !url.startsWith("http://") &&
      !url.startsWith("https://") &&
      !url.startsWith("/")
    ) {
      finalUrl = "/" + url;
    }

    // Set the rel attribute based on whether it's an affiliate link
    const rel = isAffiliateLink ? "sponsored noopener" : "noopener";

    // Pass the rel attribute to the onSubmit function
    onSubmit(finalUrl, isAffiliateLink ? "affiliate" : "regular", rel);

    // Update the URL and rel attribute if the link is already in the editor
    if (editor.isActive("link")) {
      editor
        .chain()
        .focus()
        .setLink({ href: finalUrl, rel }) // Update the link with the new URL and rel
        .run();
    }

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
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ color: "white" }}>Affiliate Link</Typography>
            <CustomSwitch
              checked={isAffiliateLink}
              onChange={(e) => setIsAffiliateLink(e.target.checked)}
              name="affiliate-link-toggle"
              id="affiliate-link-toggle"
              sx={{ ml: "2rem" }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Cancel
          </Button>
          {editor.isActive("link") && (
            <Button
              onClick={handleRemoveLink}
              sx={{ color: "rgba(255, 255, 255, 0.7)" }}
              id="remove-link-button"
            >
              Remove Link
            </Button>
          )}
          <Button type="submit" variant="contained" id="submit-link-button">
            {editor.isActive("link") ? "Update Link" : "Add Link"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LinkDialog;
