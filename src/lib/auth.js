/**
 * Shared authentication utilities
 * Single source of truth for token handling across client and server
 */

// Cookie/storage key name - single source of truth
export const AUTH_TOKEN_NAME = "accessToken";

// Cookie options for secure token storage
const COOKIE_OPTIONS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
  sameSite: "lax",
};

/**
 * Set auth token in both cookie and localStorage
 * @param {string} token - The authentication token
 */
export function setAuthToken(token) {
  if (typeof window === "undefined") return;

  // Set cookie for middleware access
  document.cookie = `${AUTH_TOKEN_NAME}=${token}; path=${COOKIE_OPTIONS.path}; max-age=${COOKIE_OPTIONS.maxAge}; SameSite=${COOKIE_OPTIONS.sameSite}`;

  // Also set localStorage for client-side API calls
  localStorage.setItem(AUTH_TOKEN_NAME, token);

  // Dispatch event to notify components of auth change
  window.dispatchEvent(new Event("authChange"));
}

/**
 * Get auth token from localStorage (client-side)
 * @returns {string|null} The token or null if not found
 */
export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_NAME);
}

/**
 * Remove auth token from both cookie and localStorage
 */
export function removeAuthToken() {
  if (typeof window === "undefined") return;

  // Clear cookie
  document.cookie = `${AUTH_TOKEN_NAME}=; path=/; max-age=0`;

  // Clear localStorage
  localStorage.removeItem(AUTH_TOKEN_NAME);
}
