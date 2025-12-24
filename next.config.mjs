/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true, // Enable source maps for Lighthouse
  images: {
    domains: ["image.lexica.art", "lexica.art", "media.licdn.com"],
    quality: 75, // Default is 75, lower = smaller files, slightly less quality
  },
};

export const ALLOWED_IMAGE_HOSTNAMES = nextConfig.images.domains;

export default nextConfig;
