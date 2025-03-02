// File: /components/article/ArticleBody.js
import React from "react";
import { Box } from "@mui/material";
import { articleContentStyles } from "./articleStyles";

export default function ArticleBody({ content }) {
  return (
    <Box className="tiptap-content" sx={articleContentStyles}>
      {content}
    </Box>
  );
}
