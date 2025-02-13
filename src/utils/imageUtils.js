// src/utils/imageUtils.js

/**
 * Validates the image URL and ensures it's a full URL with "http" or "https".
 * If it's invalid or relative, returns a fallback URL.
 * @param {string} url - The image URL to validate.
 * @param {string} fallback - The fallback image URL.
 * @returns {string} - The validated image URL or fallback URL.
 */
const fallbackImage =
  "https://image.lexica.art/full_webp/31a8a899-af34-41af-8a78-91d9c0ff578d";

export const getValidImageUrl = (url) => {
  // If no URL or it's not a full URL with http/https, use the fallback image.
  if (!url || !/^(https?:\/\/)/.test(url)) {
    return fallbackImage;
  }
  return url;
};
