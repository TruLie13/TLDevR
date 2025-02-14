// SnackbarComponent.js
"use client";

import { Snackbar, Alert } from "@mui/material";

export default function SnackbarComponent({
  open,
  onClose,
  message,
  severity,
}) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={severity || "error"}
        sx={{
          width: "100%",
          backgroundColor: "rgb(21, 18, 43)",
          border: "rgb(34, 31, 52) solid 1px",
          color: "white",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
