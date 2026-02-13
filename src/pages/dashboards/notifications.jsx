import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import {
  Bell,
  Check,
  Trash2,
  Loader2,
  Package,
  CreditCard,
  AlertTriangle,
  Info,
  CheckCheck,
} from "lucide-react"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNotifications } from "@/hooks/useNotifications"

const NOTIFICATION_ICONS = {
  order_placed: Package,
  order_fulfilled: Package,
  order_cancelled: AlertTriangle,
  topup_completed: CreditCard,
  low_balance: AlertTriangle,
  system: Info,
}

const NOTIFICATION_COLORS = {
  order_placed: "text-blue-500 bg-blue-50",
  order_fulfilled: "text-green-500 bg-green-50",
  order_cancelled: "text-red-500 bg-red-50",
  topup_completed: "text-green-500 bg-green-50",
  low_balance: "text-yellow-500 bg-yellow-50",
  system: "text-gray-500 bg-gray-50",
}

const NOTIFICATION_LABELS = {
  order_placed: "Order Placed",
  order_fulfilled: "Order Fulfilled",
  order_cancelled: "Order Cancelled",
  topup_completed: "Top-up Completed",
  low_balance: "Low Balance",
  system: "System",
}

export default function DashboardNotifications() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [filter, setFilter] = useState("all")
  const {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications()

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications({ limit: 50 })
  }, [fetchNotifications])

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true
    if (filter === "unread") return !notification.isRead
    return notification.type === filter
  })

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id)
    } catch (err) {
      console.error("Failed to mark as read:", err)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead()
    } catch (err) {
      console.error("Failed to mark all as read:", err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id)
    } catch (err) {
      console.error("Failed to delete notification:", err)
    }
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date

    // Less than 1 minute
    if (diff < 60000) {
      return "Just now"
    }
    // Less than 1 hour
    if (diff < 3600000) {
      return `${Math.floor(diff / 60000)}m ago`
    }
    // Less than 24 hours
    if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)}h ago`
    }
    // Less than 7 days
    if (diff < 604800000) {
      return `${Math.floor(diff / 86400000)}d ago`
    }

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <>
      <Helmet>
        <title>Notifications - BelajarHosting</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <DashboardSidebar
          activeMenuItem="notifications"
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="lg:pl-64 transition-all duration-300">
          <DashboardTopbar onMenuClick={() => setIsSidebarOpen(true)} />

          <main className="min-h-[calc(100vh-64px)] bg-gray-50/50 p-6 lg:p-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-500 mt-1">
                  Stay updated with your orders, transactions, and system alerts
                </p>
              </div>
              <div className="flex items-center gap-3">
                {unreadCount > 0 && (
                  <Button
                    variant="outline"
                    onClick={handleMarkAllAsRead}
                    className="gap-2"
                  >
                    <CheckCheck className="h-4 w-4" />
                    Mark all read
                  </Button>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-500">
                      <Bell className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-xl font-bold text-gray-900">
                        {notifications.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-yellow-50 text-yellow-500">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Unread</p>
                      <p className="text-xl font-bold text-gray-900">
                        {unreadCount}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Filter Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Notifications</SelectItem>
                      <SelectItem value="unread">Unread Only</SelectItem>
                      <SelectItem value="order_placed">Order Placed</SelectItem>
                      <SelectItem value="order_fulfilled">Order Fulfilled</SelectItem>
                      <SelectItem value="order_cancelled">Order Cancelled</SelectItem>
                      <SelectItem value="topup_completed">Top-up Completed</SelectItem>
                      <SelectItem value="low_balance">Low Balance</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>

                  {filter !== "all" && (
                    <Button variant="ghost" onClick={() => setFilter("all")}>
                      Clear filter
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Notifications List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {filter === "all"
                    ? "All Notifications"
                    : filter === "unread"
                    ? "Unread Notifications"
                    : `${NOTIFICATION_LABELS[filter]} Notifications`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading && notifications.length === 0 ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                  </div>
                ) : filteredNotifications.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-1">No notifications</p>
                    <p className="text-sm">
                      {filter === "all"
                        ? "You don't have any notifications yet"
                        : "No notifications match your filter"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredNotifications.map((notification) => {
                      const Icon =
                        NOTIFICATION_ICONS[notification.type] || Info
                      const colorClass =
                        NOTIFICATION_COLORS[notification.type] ||
                        NOTIFICATION_COLORS.system

                      return (
                        <div
                          key={notification.id}
                          className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                            notification.isRead
                              ? "bg-white border-gray-100 opacity-70"
                              : "bg-blue-50/30 border-blue-100"
                          }`}
                        >
                          {/* Icon */}
                          <div
                            className={`p-2 rounded-full flex-shrink-0 ${colorClass}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p
                                  className={`text-sm text-gray-900 ${
                                    notification.isRead
                                      ? "font-normal"
                                      : "font-semibold"
                                  }`}
                                >
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge
                                    variant="outline"
                                    className="text-xs capitalize"
                                  >
                                    {NOTIFICATION_LABELS[notification.type] ||
                                      notification.type}
                                  </Badge>
                                  <span className="text-xs text-gray-400">
                                    {formatTime(notification.createdAt)}
                                  </span>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-1">
                                {!notification.isRead && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleMarkAsRead(notification.id)
                                    }
                                    className="text-gray-500 hover:text-blue-600"
                                  >
                                    <Check className="h-4 w-4" />
                                    <span className="sr-only">Mark as read</span>
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleDelete(notification.id)
                                  }
                                  className="text-gray-500 hover:text-red-600"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </>
  )
}
