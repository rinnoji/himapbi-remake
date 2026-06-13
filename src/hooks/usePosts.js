// src/hooks/usePosts.js
import { useState, useCallback, useRef } from 'react';
import { fetchPosts } from '../api/blogger';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Pagination states
  const [pageTokens, setPageTokens] = useState([null]); // Index 0 is page 1 (token is null)
  const [currentPage, setCurrentPage] = useState(0); // 0-based
  const [hasMore, setHasMore] = useState(true);
  const [activeLabel, setActiveLabel] = useState(null);
  
  // Use ref to prevent double fetch
  const isLoadingRef = useRef(false);

  const loadPage = useCallback(async (pageIndex, labelParam = undefined) => {
    if (isLoadingRef.current) return;
    
    isLoadingRef.current = true;
    setLoading(true);
    setError(null);
    
    try {
      const fetchLabel = labelParam !== undefined ? labelParam : activeLabel;
      // If we are resetting (page 0 with a new label), the token is null
      const token = pageIndex === 0 && labelParam !== undefined ? null : pageTokens[pageIndex];
      
      const data = await fetchPosts({ pageToken: token, label: fetchLabel, maxResults: 10 });
      const newPosts = data.items || [];

      setPosts(newPosts); // Replace posts for the current page
      setCurrentPage(pageIndex);

      if (data.nextPageToken) {
        setPageTokens(prev => {
          const newTokens = [...prev];
          newTokens[pageIndex + 1] = data.nextPageToken;
          return newTokens;
        });
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      isLoadingRef.current = false;
      setLoading(false);
    }
  }, [pageTokens, activeLabel]);

  const filterByLabel = useCallback((label) => {
    const newLabel = label === 'All' ? null : label;
    setActiveLabel(newLabel);
    setPageTokens([null]); // Reset tokens
    loadPage(0, newLabel);
  }, [loadPage]);

  const goToNextPage = useCallback(() => {
    if (hasMore) loadPage(currentPage + 1);
  }, [hasMore, currentPage, loadPage]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 0) loadPage(currentPage - 1);
  }, [currentPage, loadPage]);

  const goToPage = useCallback((index) => {
    if (index >= 0 && index < pageTokens.length) {
      loadPage(index);
    }
  }, [pageTokens, loadPage]);

  return {
    posts,
    loading,
    error,
    activeLabel,
    // Pagination props
    currentPage,
    totalPages: pageTokens.length - (hasMore ? 0 : 1), // Only count pages we have tokens for
    hasMore,
    goToNextPage,
    goToPrevPage,
    goToPage,
    // Original methods mapped for backward compatibility where needed
    loadPosts: () => loadPage(0), 
    filterByLabel,
  };
}
