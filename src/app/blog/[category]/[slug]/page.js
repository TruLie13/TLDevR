// app/blog/[category]/[slug]/page.js
export default async function Article({ params }) {
  // Ensure params is awaited before accessing
  const { category, slug } = await params; // Destructure the category and slug from params

  // Mock data for articles (can be fetched from a database)
  const articles = [
    {
      id: 1,
      category: "react",
      slug: "react-basics",
      title: "Getting Started with React",
      content: "React is a powerful library for building user interfaces.",
    },
    {
      id: 2,
      category: "nextjs",
      slug: "nextjs-introduction",
      title: "Introduction to Next.js",
      content:
        "Next.js is a React framework that provides server-side rendering.",
    },
    {
      id: 3,
      category: "javascript",
      slug: "javascript-tips",
      title: "Top 10 JavaScript Tips",
      content: "Here are some useful JavaScript tips for developers.",
    },
  ];

  // Find the article based on category and slug
  const article = articles.find(
    (article) => article.category === category && article.slug === slug
  );

  if (!article) {
    return <p>Article not found!</p>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
}
