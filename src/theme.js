import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2", // Adjust as per your color scheme
    },
    background: {
      default: "#121212", // Dark background
    },
    text: {
      primary: "#fff", // White text for dark mode
    },
  },
});

const neoTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2", // Same as dark mode for consistency, can adjust
    },
    background: {
      default: "#000", // Darker background for Neo mode
    },
    text: {
      primary: "#00FF00", // Matrix-inspired green text
    },
  },
  typography: {
    fontFamily: "Courier New, monospace", // Monospace font to resemble the Matrix style
  },
});

export { darkTheme, neoTheme };
