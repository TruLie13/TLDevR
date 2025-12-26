"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

/**
 * A reusable confirmation modal component.
 * 
 * @param {boolean} open - Whether the modal is open.
 * @param {function} onClose - Callback when the modal is closed (cancelled).
 * @param {function} onConfirm - Callback when the confirm action is triggered.
 * @param {string} title - The title of the modal.
 * @param {string} message - The message/description displayed in the modal.
 * @param {string} confirmText - Text for the confirm button (default: "Confirm").
 * @param {string} cancelText - Text for the cancel button (default: "Cancel").
 * @param {string} confirmColor - MUI color for the confirm button (default: "error").
 */
export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "error",
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: "background.paper",
            color: "text.primary",
            borderRadius: "1rem",
            minWidth: "320px",
          },
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "text.secondary" }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: "1rem" }}>
        <Button onClick={onClose} sx={{ color: "text.primary" }}>
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={confirmColor}
          autoFocus
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
