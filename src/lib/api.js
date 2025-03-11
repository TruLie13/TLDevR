// const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api";
// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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

// Start Articles ******
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
  try {
    const res = await fetch(`${apiUrl}/articleList/recent`);
    if (!res.ok) throw new Error("Failed to fetch newest articles");
    return res.json();
  } catch (error) {
    console.error("Error fetching newest articles:", error);
    // You can return an empty array, default data, or show an error message to the user
    return []; // or return a default fallback value
  }
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
      // Get the error message from the response
      const errorData = await res.json();
      throw errorData; // This will pass through the actual error message
    }

    return await res.json();
  } catch (error) {
    console.error("Error posting article:", error);
    throw error;
  }
}

export async function fetchAllArticles() {
  // Fetch your articles from the API, database, or backend service
  const response = await fetch(`${apiUrl}/articles`);
  const articles = await response.json();
  return articles;
}

export async function fetchArticlesByCategory(categorySlug) {
  if (!categorySlug) {
    throw new Error("categorySlug is required to fetch articles.");
  }

  const response = await fetch(`${apiUrl}/articles/category/${categorySlug}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch articles for category: ${categorySlug}`);
  }

  const data = await response.json();
  return data.articles; // Extract only the articles array
}
// Start Article Like ******
export async function fetchArticleLikeStatus(articleSlug) {
  if (!articleSlug) return null;

  try {
    const response = await fetch(`${apiUrl}/articles/${articleSlug}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch article like status for ${articleSlug}`);
    }

    const data = await response.json();
    return data.article;
  } catch (error) {
    console.error("Error fetching article like status:", error);
    return null;
  }
}

export async function updateArticleLikeStatus(articleSlug, action) {
  if (!articleSlug) return null;

  try {
    const response = await fetch(`${apiUrl}/articles/like/${articleSlug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify({ action }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update like status for ${articleSlug}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating article like status:", error);
    throw error;
  }
}
// End Article Like ******

// End Articles ******

// Start Categories ******
export async function fetchAllCategories() {
  // Fetch your articles from the API, database, or backend service
  const response = await fetch(`${apiUrl}/categories`);
  const articles = await response.json();
  return articles;
}

export async function fetchCategoryPreviews() {
  // Fetch your articles from the API, database, or backend service
  const response = await fetch(`${apiUrl}/categories/previews`);
  const articles = await response.json();
  return articles;
}
// End Categories ******

// Start Login function ******
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
// End Login function ******
