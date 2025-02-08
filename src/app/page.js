export const dynamic = "force-static";
export const revalidate = 21600; // 6 hours

import ArticleList from "@/components/ArticleList.Component.js";
import SafeArea from "@/components/SafeArea.js";
import HomePageCover from "@/components/HomePageCover.js";
import Footer from "@/components/Footer.js";

async function HomePage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [newestRes, featuredRes] = await Promise.all([
    fetch(`${apiUrl}/articleList/recent`),
    fetch(`${apiUrl}/articleList/featured`),
  ]);

  const newestArticles = await newestRes.json();
  const featuredArticles = await featuredRes.json();

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
      <Footer />
    </SafeArea>
  );
}

export default HomePage;
