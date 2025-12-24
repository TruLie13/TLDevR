export const revalidate = 3600; // 1 hour

import ArticleList from "@/components/ArticleList.Component.js";
import HomePageCover from "@/components/HomePageCover.js";
import SafeArea from "@/components/SafeArea.js";
import { Box } from "@mui/material";
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
      <Box sx={{ paddingTop: "2.5rem", paddingLeft: "1.25rem", paddingRight: "1.25rem" }}>
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
                <Box key={categoryData.category.id}>
                  <ArticleList
                    listName={categoryData.category.name}
                    articles={categoryData.articles}
                    categorySlug={categoryData.category.slug}
                  />
                  <br />
                </Box>
              );
            }
            return null; // Skip rendering if no articles
          })}
      </Box>
    </SafeArea>
  );
}

export default HomePage;
