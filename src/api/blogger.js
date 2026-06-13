// src/api/blogger.js
// Blogger API v3 — All data fetching for HIMA PBI UNISSULA

const API_KEY = import.meta.env.VITE_BLOGGER_API_KEY;
const BLOG_ID = import.meta.env.VITE_BLOG_ID;
const BASE_URL = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts`;

/**
 * Fetch a paginated list of posts.
 * @param {string|null} pageToken - For pagination (next page)
 * @param {string|null} label     - Filter by label/tag
 * @param {number}      maxResults
 */
export async function fetchPosts({ pageToken = null, label = null, maxResults = 12 } = {}) {
  const params = new URLSearchParams({
    key: API_KEY,
    maxResults: String(maxResults),
    fetchBodies: 'true',
    fetchImages: 'true',
  });

  if (pageToken) params.set('pageToken', pageToken);
  if (label) params.set('labels', label);

  const res = await fetch(`${BASE_URL}?${params}`);
  if (!res.ok) throw new Error(`Blogger API error: ${res.status}`);
  return res.json(); // { items: [], nextPageToken: '...' }
}

/**
 * Fetch a single post by ID.
 */
export async function fetchPost(postId) {
  const params = new URLSearchParams({ key: API_KEY, fetchBody: 'true' });
  const res = await fetch(`${BASE_URL}/${postId}?${params}`);
  if (!res.ok) throw new Error(`Blogger API error: ${res.status}`);
  return res.json();
}

/**
 * Search posts by query string.
 */
export async function searchPosts(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    maxResults: '20',
    fetchBodies: 'true',
  });
  const res = await fetch(`${BASE_URL}/search?${params}`);
  if (!res.ok) throw new Error(`Blogger API error: ${res.status}`);
  return res.json();
}
