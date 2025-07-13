import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { articleContentStyles, getUserAgentStyles } from "./articleStyles";

export default function ArticleBody({ content }) {
  useEffect(() => {
    const iPhoneStyles = getUserAgentStyles();
    if (iPhoneStyles) {
      const style = document.createElement("style");
      style.textContent = iPhoneStyles;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  return (
    <Box className="tiptap-content" sx={articleContentStyles}>
      {content}
    </Box>
  );
}
