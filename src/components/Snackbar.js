// SnackbarComponent.js
"use client";

import { Snackbar, Alert } from "@mui/material";
import { background } from "@/lib/themeTokens";

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
          backgroundColor: background.paper,
          border: `${background.hover} solid 1px`,
          color: "white",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
