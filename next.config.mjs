/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.lexica.art", "lexica.art", "media.licdn.com"],
  },
};

export const ALLOWED_IMAGE_HOSTNAMES = nextConfig.images.domains;

export default nextConfig;
