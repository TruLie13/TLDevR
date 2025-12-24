/**
 * Theme Token System
 * Centralized color tokens for consistent styling across the app
 */

export const colors = {
  // Background colors
  background: {
    default: "rgb(8, 4, 31)",      // Main/darkest background
    paper: "rgb(21, 18, 43)",      // Card/elevated surfaces
    hover: "rgb(34, 31, 52)",      // Hover states, borders
    overlay: "rgba(19, 13, 48, 0.75)",  // Card title overlays
    buttonOverlay: "rgba(0,0,0,0.7)",   // Action button backgrounds
    transparent: "rgba(71, 49, 184, 0)", // Fully transparent
    listItem: "rgba(41, 37, 66, 0.58)",  // List item background
  },

  // Text colors
  text: {
    primary: "#ffffff",
    secondary: "rgba(255,255,255,0.8)",
    muted: "rgba(255,255,255,0.7)",
    disabled: "rgba(255,255,255,0.5)",
    subtle: "rgba(255, 255, 255, 0.6)",
  },

  // Border colors
  border: {
    default: "rgb(34, 31, 52)",
    light: "rgba(255,255,255,0.3)",
    focus: "rgba(255, 255, 255, 0.4)",
    subtle: "rgba(255, 255, 255, 0.23)",
  },

  // Accent colors
  accent: {
    primary: "#1976d2",
    error: "rgb(239, 10, 10)",
    grey: "grey",
  },
};

// Convenience exports for common patterns
export const { background, text, border, accent } = colors;

export default colors;
