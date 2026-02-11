import { useState, useCallback } from 'react';
import { hostingApi } from '@/lib/api';

/**
 * Hook for managing hosting data and operations
 */
export function useHosting() {
  const [hostings, setHostings] = useState([]);
  const [stats, setStats] = useState(null);
  const [currentHosting, setCurrentHosting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all hostings with stats
   */
  const fetchHostings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await hostingApi.getHostings();
      setHostings(response.data.hostings || []);
      setStats(response.data.stats || null);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch hostings');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch a single hosting by ID
   */
  const fetchHostingById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await hostingApi.getHostingById(id);
      setCurrentHosting(response.data.hosting);
      return response.data.hosting;
    } catch (err) {
      setError(err.message || 'Failed to fetch hosting');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a new hosting
   */
  const createHosting = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await hostingApi.createHosting(data);
      await fetchHostings(); // Refresh list after creation
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to create hosting');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchHostings]);

  /**
   * Update a hosting
   */
  const updateHosting = useCallback(async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await hostingApi.updateHosting(id, data);
      await fetchHostings(); // Refresh list
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to update hosting');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchHostings]);

  /**
   * Delete a hosting
   */
  const deleteHosting = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await hostingApi.deleteHosting(id);
      await fetchHostings(); // Refresh list after deletion
    } catch (err) {
      setError(err.message || 'Failed to delete hosting');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchHostings]);

  /**
   * Check domain availability
   */
  const checkDomain = useCallback(async (domain) => {
    setLoading(true);
    setError(null);
    try {
      const response = await hostingApi.checkDomain(domain);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to check domain');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Refresh all hosting data
   */
  const refresh = useCallback(async () => {
    await fetchHostings();
  }, [fetchHostings]);

  return {
    // State
    hostings,
    stats,
    currentHosting,
    loading,
    error,

    // Actions
    fetchHostings,
    fetchHostingById,
    createHosting,
    updateHosting,
    deleteHosting,
    checkDomain,
    clearError,
    refresh,
  };
}
