import parse from "html-react-parser";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Import a theme (you can choose different themes)
import "prismjs/components/prism-javascript"; // Import language support
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";
// Add more languages as needed

export const highlightCode = (htmlContent) => {
  if (!htmlContent) return null;

  // Parse the HTML content
  let processedContent = htmlContent;

  // Replace the custom-code-block class with prism classes (if any custom classes are used)
  processedContent = processedContent.replace(
    /<pre class="custom-code-block"><code>/g,
    '<pre><code class="language-javascript">'
  );

  // Parse the content with React
  const highlightedContent = parse(processedContent);

  // Apply Prism highlighting
  setTimeout(() => {
    Prism.highlightAll();
  }, 0);

  return highlightedContent;
};
