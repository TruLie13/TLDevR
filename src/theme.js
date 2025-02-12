import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "rgb(8, 4, 31)", // Main background
      paper: "rgb(21, 18, 43)", // Card background or elevated surfaces
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
    border: "#333", // Custom border color
    surface: {
      primary: "#1e1e1e",
      secondary: "#2a2a2a",
    },
  },
});

const neoTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#000",
      paper: "#101010",
    },
    text: {
      primary: "#00FF00",
      secondary: "#66FF66",
    },
    border: "#00FF00",
    surface: {
      primary: "#101010",
      secondary: "#181818",
    },
  },
  typography: {
    fontFamily: "Courier New, monospace",
  },
});

export { darkTheme, neoTheme };
