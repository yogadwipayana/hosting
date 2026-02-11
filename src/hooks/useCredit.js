import { useState, useEffect, useCallback } from 'react';
import { creditApi } from '@/lib/api';

/**
 * Hook for managing credit data and operations
 */
export function useCredit() {
  const [credits, setCredits] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch credit summary (balance + recent transactions)
   */
  const fetchCredits = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await creditApi.getCredits();
      setCredits(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch credits');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch paginated transaction history
   */
  const fetchTransactions = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await creditApi.getTransactions(params);
      setTransactions(response.data.transactions);
      setPagination(response.data.pagination);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch transactions');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a top-up transaction
   */
  const createTopup = useCallback(async (amount, paymentMethod) => {
    setLoading(true);
    setError(null);
    try {
      const response = await creditApi.createTopup({ amount, paymentMethod });
      // Refresh credits after successful top-up creation
      await fetchCredits();
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to create top-up');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchCredits]);

  /**
   * Get transaction details by ID
   */
  const getTransaction = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await creditApi.getTransactionById(id);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch transaction');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Cancel a pending transaction
   */
  const cancelTransaction = useCallback(async (id, reason = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await creditApi.cancelTransaction(id, reason);
      // Refresh credits and transactions after cancellation
      await fetchCredits();
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to cancel transaction');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchCredits]);

  /**
   * Clear any error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Refresh all credit data
   */
  const refresh = useCallback(async () => {
    await fetchCredits();
  }, [fetchCredits]);

  return {
    // State
    credits,
    transactions,
    pagination,
    loading,
    error,

    // Actions
    fetchCredits,
    fetchTransactions,
    createTopup,
    getTransaction,
    cancelTransaction,
    clearError,
    refresh,
  };
}
