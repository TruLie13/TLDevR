// File: /components/article/articleStyles.js

export const articleContentStyles = {
  color: "text.secondary",
  textAlign: "left",
  width: "100%",
  "& a": {
    color: "primary.main",
    textDecoration: "underline",
    fontWeight: "bold",
    "&:hover": {
      color: "primary.dark",
    },
    margin: 0,
  },
  "& a[target='_blank']": {
    color: "text.primary",
    textDecoration: "underline",
    "&:hover": {
      color: "primary.dark",
    },
    "&::after": {
      content: `"[↗]"`,
      marginLeft: "0.2em",
      fontSize: "0.9em",
    },
  },
  "& p": {
    fontFamily: "georgia",
    color: "text.primary",
    marginBottom: "1rem",
  },
  "& h4": {
    color: "text.primary",
    fontSize: "1.2rem",
    textAlign: "left",
  },
  "& h3": {
    color: "text.primary",
    fontSize: "1.5rem",
    textAlign: "left",
  },
  "& h2": {
    color: "text.primary",
    fontSize: "1.5rem",
    textAlign: "left",
  },
  "& p:empty": {
    margin: "16px 0",
    padding: "1px",
  },
  "& strong": {
    fontWeight: "bold",
    fontFamily: "Arial",
  },
  "& em": {
    fontStyle: "italic",
  },
  "& u": {
    textDecoration: "underline",
  },
  "& ol": {
    listStyleType: "decimal",
    marginLeft: "5px",
    paddingLeft: "10px",
    color: "text.primary",
  },
  "& li": {
    marginBottom: "1rem !important",
    margin: 0,
  },
  "& ul": {
    listStyleType: "disc",
    marginLeft: "5px",
    paddingLeft: "10px",
  },
  "& ol li p strong": {
    fontFamily: "Arial",
    color: "text.primary",
  },
  "& blockquote": {
    borderLeft: "4px solid",
    borderColor: "primary.main",
    paddingLeft: "16px",
    fontStyle: "italic",
    margin: "16px 0",
    color: "text.secondary",
  },
};

export const codeBlockStyles = `
  pre {
    background-color: rgb(239, 10, 10);
    border-radius: 6px;
    padding: 1rem;
    margin: 1rem 0;
    overflow-x: auto;
    width: 100%;
    box-sizing: border-box;
  }
  pre code {
    font-family: 'Fira Code', 'Courier New', monospace;
    display: block;
    white-space: pre;
  }
  .tiptap-content {
    width: 100%;
  }
`;

export const getUserAgentStyles = () => {
  if (
    typeof window !== "undefined" &&
    /iPhone|iPad|iPod/.test(navigator.userAgent)
  ) {
    return `
      a[target='_blank']::after {
        content: "↗" !important;
      }
    `;
  }
  return "";
};
