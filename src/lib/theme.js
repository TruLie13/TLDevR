"use client";

import { createTheme } from "@mui/material/styles";
import { colors } from "./themeTokens";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.accent.primary,
    },
    error: {
      main: colors.accent.error,
    },
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
      overlay: colors.background.overlay,
      hover: colors.background.hover,
      listItem: colors.background.listItem,
      buttonOverlay: colors.background.buttonOverlay,
      transparent: colors.background.transparent,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.disabled,
    },
    divider: colors.border.default,
  },
  components: {
    // Global overrides if needed
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Optional: Remove uppercase default
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.background.default,
          color: colors.text.primary,
        },
      },
    },
  },
});

export default theme;
