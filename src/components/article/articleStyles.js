// File: /components/article/articleStyles.js

export const articleContentStyles = {
  color: "rgba(255,255,255,0.8)",
  textAlign: "left",
  width: "100%",
  "& a": {
    color: "#3498db",
    textDecoration: "underline",
    fontWeight: "bold",
    "&:hover": {
      color: "#2980b9",
    },
    margin: 0,
  },
  "& a[target='_blank']": {
    color: "white",
    textDecoration: "underline",
    "&:hover": {
      color: "#2980b9",
    },
    "&::after": {
      content: `"[↗]"`,
      marginLeft: "0.2em",
      fontSize: "0.9em",
    },
  },
  "& p": {
    fontFamily: "georgia",
    color: "white",
    marginBottom: "1rem",
  },
  "& h4": {
    color: "white",
    fontSize: "1.2rem",
    textAlign: "left",
  },
  "& h3": {
    color: "white",
    fontSize: "1.5rem",
    textAlign: "left",
  },
  "& h2": {
    color: "white",
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
    color: "white",
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
    color: "white",
  },
  "& blockquote": {
    borderLeft: "4px solid #3498db",
    paddingLeft: "16px",
    fontStyle: "italic",
    margin: "16px 0",
    color: "rgba(255, 255, 255, 0.8)",
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
