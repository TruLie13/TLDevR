/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.lexica.art", "lexica.art"],
  },
};

export const ALLOWED_IMAGE_HOSTNAMES = nextConfig.images.domains;

export default nextConfig;
