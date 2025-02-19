/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:8000", //resolve .env issue or replace with hardcoded only
  generateRobotsTxt: true, // Generate a robots.txt file
  sitemapSize: 5000,
  exclude: ["/admin", "/dashboard", "/create"], // Exclude pages if needed
  generateIndexSitemap: false,
};
