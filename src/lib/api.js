const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const isWindowUndefined = typeof window === "undefined";

let accessToken;
if (!isWindowUndefined) {
  accessToken = localStorage.getItem("accessToken");
}

function shouldFetch() {
  if (isWindowUndefined) return false;
  const lastFetched = localStorage.getItem("lastFetched");
  const now = Date.now();
  return !lastFetched || now - lastFetched > 6 * 60 * 60 * 1000; // 6 hours
}

export async function fetchFeaturedArticles() {
  // Check if we're on the server side
  if (typeof window === "undefined") {
    // Server-side fetch
    try {
      const res = await fetch(`${apiUrl}/articleList/featured`);
      if (!res.ok) throw new Error("Failed to fetch featured articles");
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching featured articles:", error);
      return [];
    }
  } else {
    // Client-side fetch with caching
    if (!shouldFetch()) {
      const cachedArticles = localStorage.getItem("featuredArticlesCache");
      return cachedArticles ? JSON.parse(cachedArticles) : [];
    }

    try {
      const res = await fetch(`${apiUrl}/articleList/featured`);
      if (!res.ok) throw new Error("Failed to fetch featured articles");
      const data = await res.json();
      localStorage.setItem("lastFetched", Date.now().toString());
      localStorage.setItem("featuredArticlesCache", JSON.stringify(data));
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching featured articles:", error);
      return [];
    }
  }
}

export async function fetchNewestArticles() {
  const res = await fetch(`${apiUrl}/articleList/recent`);
  if (!res.ok) throw new Error("Failed to fetch newest articles");
  return res.json();
}

export async function fetchArticle(slug) {
  try {
    const res = await fetch(`${apiUrl}/articles/${slug}`);
    if (!res.ok) {
      if (res.status === 404) {
        return null; // Article not found
      }
      throw new Error(`Failed to fetch article: ${slug}`);
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching article ${slug}:`, error);
    return null;
  }
}

export async function postArticle(articleData) {
  try {
    const res = await fetch(`${apiUrl}/articles/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }), // Add Authorization header if token exists
      },
      body: JSON.stringify(articleData),
    });

    if (!res.ok) {
      throw new Error("Failed to create article");
    }

    return await res.json();
  } catch (error) {
    console.error("Error posting article:", error);
    throw error;
  }
}

export async function postLogin(loginData) {
  try {
    const res = await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await res.json(); // Parse response JSON

    if (!res.ok) {
      throw new Error(data.message || "Failed to login"); // Return server message
    }

    localStorage.setItem("accessToken", data.accessToken); // Store token in localStorage
    return data; // Return successful login response
  } catch (error) {
    console.error("Error posting login:", error);
    throw error; // Rethrow error for UI handling
  }
}
