import ArticleList from "@/components/ArticleList.Component.js";

export default function HomePage() {
  return (
    <>
      <ArticleList listName="Newest Articles" queryKey={["newestArticles"]} />
      <ArticleList
        listName="Featured Articles"
        queryKey={["featuredArticles"]}
      />
    </>
  );
}
