import ArticleList from "@/components/ArticleList.Component.js";
import SafeArea from "@/components/SafeArea.js";
import HomePageCover from "@/components/HomePageCover.js";
import Footer from "@/components/Footer.js";

export default function HomePage() {
  return (
    <SafeArea>
      <HomePageCover />
      <div className="pt-10 pl-5 pr-5">
        <ArticleList listName="Newest Articles" queryKey={["newestArticles"]} />
        <br></br>
        <ArticleList
          listName="Featured Articles"
          queryKey={["featuredArticles"]}
        />
      </div>
      <Footer />
    </SafeArea>
  );
}
