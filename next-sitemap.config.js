/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tldevr.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: false, // We manage robots.txt manually
  sitemapSize: 5000,
  exclude: ["/login", "/create", "/edit/*", "/admin", "/dashboard"],
  generateIndexSitemap: false,
  
  // Transform function to customize priority and changefreq based on path
  transform: async (config, path) => {
    // Homepage gets highest priority
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }
    
    // Category pages get medium priority
    if (path.match(/^\/blog\/[^/]+$/)) {
      return {
        loc: path,
        changefreq: "daily",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      };
    }
    
    // Default for other static pages
    return {
      loc: path,
      changefreq: "weekly",
      priority: 0.5,
      lastmod: new Date().toISOString(),
    };
  },
  
  // Fetch dynamic article URLs at build time
  additionalPaths: async (config) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "https://api.tldevr.com";
    
    try {
      // Fetch all articles from API
      const response = await fetch(`${apiUrl}/articles`);
      if (!response.ok) {
        console.error("Failed to fetch articles for sitemap");
        return [];
      }
      
      const articles = await response.json();
      
      // Generate sitemap entries for each article (with images)
      return articles.map((article) => {
        const entry = {
          loc: `/blog/${article.category?.slug || "general"}/${article.slug}`,
          lastmod: article.updatedAt || article.createdAt || new Date().toISOString(),
          changefreq: "weekly",
          priority: 0.8,
        };
        
        // Add image if available
        if (article.image) {
          entry.images = [{ loc: article.image }];
        }
        
        return entry;
      });
    } catch (error) {
      console.error("Error fetching articles for sitemap:", error);
      return [];
    }
  },
};
