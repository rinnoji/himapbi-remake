// src/hooks/usePosts.js
import { useState, useCallback } from 'react';
import { fetchPosts } from '../api/blogger';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [activeLabel, setActiveLabel] = useState(null);

  const loadPosts = useCallback(async ({ reset = false, label = null } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const token = reset ? null : nextPageToken;
      const data = await fetchPosts({ pageToken: token, label, maxResults: 10 });
      const newPosts = data.items || [];

      setPosts(prev => reset ? newPosts : [...prev, ...newPosts]);
      setNextPageToken(data.nextPageToken || null);
      setHasMore(!!data.nextPageToken);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [nextPageToken]);

  const filterByLabel = useCallback((label) => {
    const newLabel = label === 'All' ? null : label;
    setActiveLabel(newLabel);
    setPosts([]);
    setNextPageToken(null);
    setHasMore(true);
    loadPosts({ reset: true, label: newLabel });
  }, [loadPosts]);

  return {
    posts,
    loading,
    error,
    hasMore,
    activeLabel,
    loadPosts,
    filterByLabel,
  };
}
