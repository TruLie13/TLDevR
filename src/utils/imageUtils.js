// src/utils/imageUtils.js

/**
 * Validates the image URL and ensures it's a full URL with "http" or "https".
 * If it's invalid or relative, returns a fallback URL.
 * @param {string} url - The image URL to validate.
 * @returns {string} - The validated image URL or fallback URL.
 */

import { ALLOWED_IMAGE_HOSTNAMES } from "../../next.config.mjs";

export const fallback_image = "/images/fallback.png";

export const getValidImageUrl = (url) => {
  if (!url || !/^(https?:\/\/)/.test(url)) {
    return fallback_image;
  }

  try {
    const hostname = new URL(url).hostname;
    if (!ALLOWED_IMAGE_HOSTNAMES.includes(hostname)) {
      return fallback_image; // Block unapproved third-party images
    }
  } catch (error) {
    return fallback_image; // Handle invalid URLs gracefully
  }

  if (url.includes("lexica.art/prompt")) {
    return url.replace("/prompt", "/full_webp") + ".webp";
  }

  return url;
};
