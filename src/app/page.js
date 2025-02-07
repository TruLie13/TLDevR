import ArticleList from "@/components/ArticleList.Component.js";
import SafeArea from "@/components/SafeArea.js";

export default function HomePage() {
  return (
    <SafeArea>
      <ArticleList listName="Newest Articles" queryKey={["newestArticles"]} />
      <br></br>
      <ArticleList
        listName="Featured Articles"
        queryKey={["featuredArticles"]}
      />
    </SafeArea>
  );
}
