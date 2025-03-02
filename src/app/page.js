export const revalidate = 21600; // 6 hours

import ArticleList from "@/components/ArticleList.Component.js";
import HomePageCover from "@/components/HomePageCover.js";
import SafeArea from "@/components/SafeArea.js";
import {
  fetchFeaturedArticles,
  fetchNewestArticles,
  fetchCategoryPreviews,
} from "@/lib/api.js";

async function HomePage() {
  const [newestArticles, featuredArticles, CategoryPreviews] =
    await Promise.all([
      fetchNewestArticles(),
      fetchFeaturedArticles(),
      fetchCategoryPreviews(),
    ]);

  return (
    <SafeArea>
      <HomePageCover />
      <div className="pt-10 pl-5 pr-5">
        <ArticleList
          listName="Newest"
          articles={Array.isArray(newestArticles) ? newestArticles : []}
        />
        <br />
        <ArticleList
          listName="Featured"
          articles={Array.isArray(featuredArticles) ? featuredArticles : []}
        />
        <br />
        {/* Map through CategoryPreviews and conditionally render ArticleList */}
        {Array.isArray(CategoryPreviews) &&
          CategoryPreviews.map((categoryData) => {
            // Only render if there are articles
            if (categoryData.articles && categoryData.articles.length > 0) {
              return (
                <div key={categoryData.category.id}>
                  <ArticleList
                    listName={categoryData.category.name}
                    articles={categoryData.articles}
                    categorySlug={categoryData.category.slug}
                  />
                  <br />
                </div>
              );
            }
            return null; // Skip rendering if no articles
          })}
      </div>
    </SafeArea>
  );
}

export default HomePage;
