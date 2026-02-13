import { useState, useEffect, useCallback } from 'react';
import { notificationApi } from '@/lib/api';

/**
 * Hook for managing notifications
 */
export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch notifications with pagination
   */
  const fetchNotifications = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await notificationApi.getNotifications(params);
      setNotifications(response.data?.notifications || []);
      setPagination(response.data?.pagination);
      setUnreadCount(response.data?.unreadCount || 0);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch notifications');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch recent unread notifications (for bell)
   */
  const fetchRecentNotifications = useCallback(async (limit = 5) => {
    try {
      const response = await notificationApi.getRecentNotifications(limit);
      setNotifications(response.data?.notifications || []);
      setUnreadCount(response.data?.unreadCount || 0);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch recent notifications:', err);
      return { notifications: [], unreadCount: 0 };
    }
  }, []);

  /**
   * Mark notification as read
   */
  const markAsRead = useCallback(async (id) => {
    try {
      const response = await notificationApi.markAsRead(id);
      // Update local state
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to mark notification as read');
      throw err;
    }
  }, []);

  /**
   * Mark all notifications as read
   */
  const markAllAsRead = useCallback(async () => {
    setLoading(true);
    try {
      const response = await notificationApi.markAllAsRead();
      // Update local state
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to mark all notifications as read');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Delete notification
   */
  const deleteNotification = useCallback(async (id) => {
    try {
      await notificationApi.deleteNotification(id);
      // Update local state
      const deleted = notifications.find(n => n.id === id);
      setNotifications(prev => prev.filter(n => n.id !== id));
      if (deleted && !deleted.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      setError(err.message || 'Failed to delete notification');
      throw err;
    }
  }, [notifications]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Refresh notifications
   */
  const refresh = useCallback(async () => {
    await fetchRecentNotifications();
  }, [fetchRecentNotifications]);

  return {
    // State
    notifications,
    unreadCount,
    pagination,
    loading,
    error,

    // Actions
    fetchNotifications,
    fetchRecentNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearError,
    refresh,
  };
}
