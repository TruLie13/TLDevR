export const dynamic = "force-static";
export const revalidate = 21600; // 6 hours

import ArticleList from "@/components/ArticleList.Component.js";
import Footer from "@/components/Footer.js";
import HomePageCover from "@/components/HomePageCover.js";
import SafeArea from "@/components/SafeArea.js";
import { fetchFeaturedArticles, fetchNewestArticles } from "@/lib/api.js";

async function HomePage() {
  const [newestArticles, featuredArticles] = await Promise.all([
    fetchNewestArticles(),
    fetchFeaturedArticles(),
  ]);

  return (
    <SafeArea>
      <HomePageCover />
      <div className="pt-10 pl-5 pr-5">
        <ArticleList
          listName="Newest Articles"
          articles={Array.isArray(newestArticles) ? newestArticles : []}
        />
        <br />
        <ArticleList
          listName="Featured Articles"
          articles={Array.isArray(featuredArticles) ? featuredArticles : []}
        />
      </div>
      {/* <Footer /> */}
    </SafeArea>
  );
}

export default HomePage;
