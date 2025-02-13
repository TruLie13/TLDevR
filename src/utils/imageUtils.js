// src/utils/imageUtils.js

/**
 * Validates the image URL and ensures it's a full URL with "http" or "https".
 * If it's invalid or relative, returns a fallback URL.
 * @param {string} url - The image URL to validate.
 * @returns {string} - The validated image URL or fallback URL.
 */

export const fallback_image =
  "https://image.lexica.art/full_webp/31a8a899-af34-41af-8a78-91d9c0ff578d"; // Default fallback image

export const getValidImageUrl = (url) => {
  // If no URL or it's not a full URL with http/https, use the fallback image.
  if (!url || !/^(https?:\/\/)/.test(url)) {
    return fallback_image;
  }

  // Check if the URL contains lexica.art
  if (url.includes("lexica.art/prompt")) {
    // Attempt to adjust the URL to point to an actual image file
    return url.replace("/prompt", "/full_webp") + ".webp"; // Ensure it ends with an image format
  }

  // Otherwise, return the URL (which should be an actual image URL already)
  return url;
};
