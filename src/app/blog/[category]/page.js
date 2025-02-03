// app/blog/[category]/page.js
export default async function Category({ params }) {
  const { category } = await params;

  // Mock data for articles (can be fetched from a database)
  const articles = [
    {
      id: 1,
      category: "react",
      slug: "react-basics",
      title: "Getting Started with React",
    },
    {
      id: 2,
      category: "nextjs",
      slug: "nextjs-introduction",
      title: "Introduction to Next.js",
    },
    {
      id: 3,
      category: "javascript",
      slug: "javascript-tips",
      title: "Top 10 JavaScript Tips",
    },
  ];

  // Filter articles by category
  const filteredArticles = articles.filter(
    (article) => article.category === category
  );

  return (
    <div>
      <h1>{category} Articles</h1>
      <ul>
        {filteredArticles.map((article) => (
          <li key={article.id}>
            <a href={`/blog/${category}/${article.slug}`}>{article.title}</a>{" "}
            {/* Article links */}
          </li>
        ))}
      </ul>
    </div>
  );
}
