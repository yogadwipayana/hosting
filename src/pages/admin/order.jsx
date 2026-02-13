import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import {
  Package,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  Clock,
  Loader2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Eye,
  Server,
  Database,
  Globe,
  Cpu,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { FulfillmentModal } from "@/components/admin/FulfillmentModal"
import { adminApi } from "@/lib/api"
import { cn, formatDateTime } from "@/lib/utils"

// Service type icons
const SERVICE_ICONS = {
  VPS: Server,
  HOSTING: Globe,
  DATABASE: Database,
  AUTOMATION: Cpu,
}

// Status Badge
function StatusBadge({ status }) {
  const styles = {
    ACTIVE: "border-green-200 text-green-700 bg-green-50",
    PENDING: "border-yellow-200 text-yellow-700 bg-yellow-50",
    SUSPENDED: "border-red-200 text-red-700 bg-red-50",
    CANCELLED: "border-gray-200 text-gray-700 bg-gray-50",
    PROVISIONING: "border-blue-200 text-blue-700 bg-blue-50",
  }

  const icons = {
    ACTIVE: CheckCircle,
    PENDING: Clock,
    SUSPENDED: Clock,
    CANCELLED: Clock,
    PROVISIONING: Loader2,
  }

  const Icon = icons[status] || Clock

  return (
    <Badge variant="outline" className={cn("text-xs gap-1", styles[status] || styles.PENDING)}>
      <Icon className={cn("h-3 w-3", status === "PROVISIONING" && "animate-spin")} />
      {status?.toLowerCase()}
    </Badge>
  )
}

// View Order Dialog
function ViewOrderDialog({ order, open, onClose }) {
  if (!order) return null

  const Icon = SERVICE_ICONS[order.serviceType] || Package

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            Order Details
          </DialogTitle>
          <DialogDescription>
            {order.serviceType} order information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase">Order ID</p>
              <p className="text-sm font-mono text-foreground">{order.id}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase">Status</p>
              <StatusBadge status={order.status?.toUpperCase()} />
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-xs text-muted-foreground uppercase mb-1">User</p>
            <p className="text-sm text-foreground">{order.user?.name || "N/A"}</p>
            <p className="text-sm text-muted-foreground">{order.user?.email}</p>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-xs text-muted-foreground uppercase mb-2">Service Details</p>
            <div className="space-y-2">
              {order.name && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Name:</span>
                  <span className="text-sm text-foreground">{order.name}</span>
                </div>
              )}
              {order.hostname && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Hostname:</span>
                  <span className="text-sm text-foreground">{order.hostname}</span>
                </div>
              )}
              {order.domain && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Domain:</span>
                  <span className="text-sm text-foreground">{order.domain}</span>
                </div>
              )}
              {order.subdomain && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Subdomain:</span>
                  <span className="text-sm text-foreground">{order.subdomain}</span>
                </div>
              )}
              {order.plan && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Plan:</span>
                  <span className="text-sm text-foreground capitalize">{order.plan}</span>
                </div>
              )}
              {order.engine && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Engine:</span>
                  <span className="text-sm text-foreground">{order.engine}</span>
                </div>
              )}
              {order.location && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Location:</span>
                  <span className="text-sm text-foreground">{order.location}</span>
                </div>
              )}
              {order.pricePerMonth && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Price/Month:</span>
                  <span className="text-sm text-foreground">
                    Rp {order.pricePerMonth.toLocaleString("id-ID")}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-xs text-muted-foreground uppercase mb-1">Created</p>
            <p className="text-sm text-foreground">{formatDateTime(order.createdAt)}</p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Fulfill Order Dialog removed - using FulfillmentModal component instead

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 })

  // Filters
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [typeFilter, setTypeFilter] = useState("ALL")
  const [searchQuery, setSearchQuery] = useState("")

  // Dialogs
  const [viewOrder, setViewOrder] = useState(null)
  const [fulfillOrder, setFulfillOrder] = useState(null)

  const fetchOrders = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
      }

      if (statusFilter !== "ALL") {
        params.status = statusFilter
      }

      if (typeFilter !== "ALL") {
        params.type = typeFilter
      }

      const response = await adminApi.getOrders(params)
      setOrders(response.data?.orders || [])
      setPagination(response.data?.pagination || pagination)
    } catch (err) {
      setError(err.message || "Failed to fetch orders")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [pagination.page, statusFilter, typeFilter])

  // Filter orders by search query
  const filteredOrders = orders.filter((order) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      order.id?.toLowerCase().includes(query) ||
      order.user?.email?.toLowerCase().includes(query) ||
      order.user?.name?.toLowerCase().includes(query) ||
      order.name?.toLowerCase().includes(query) ||
      order.hostname?.toLowerCase().includes(query) ||
      order.domain?.toLowerCase().includes(query)
    )
  })

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }))
    }
  }

  const handleFulfillSuccess = () => {
    setFulfillOrder(null)
    fetchOrders() // Refresh orders after successful fulfillment
  }

  return (
    <>
      <Helmet>
        <title>Orders Management - BelajarHosting Admin</title>
      </Helmet>

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Orders Management</h1>
            <p className="text-muted-foreground mt-1">Manage and fulfill customer service orders</p>
          </div>
          <Button
            onClick={fetchOrders}
            disabled={loading}
            variant="outline"
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
            Refresh
          </Button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Filters */}
        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders, users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="SUSPENDED">Suspended</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  <SelectItem value="PROVISIONING">Provisioning</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <Package className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Types</SelectItem>
                  <SelectItem value="VPS">VPS</SelectItem>
                  <SelectItem value="HOSTING">Hosting</SelectItem>
                  <SelectItem value="DATABASE">Database</SelectItem>
                  <SelectItem value="AUTOMATION">Automation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">All Orders</CardTitle>
            <CardDescription className="text-muted-foreground">
              Showing {filteredOrders.length} of {pagination.total} orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && orders.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>No orders found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Order ID</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">User</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Type</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Created</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => {
                      const Icon = SERVICE_ICONS[order.serviceType] || Package

                      return (
                        <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-primary" />
                              <span className="text-sm font-mono text-foreground">
                                {order.id?.slice(0, 8)}...
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-sm text-foreground">{order.user?.name || "N/A"}</p>
                              <p className="text-xs text-muted-foreground">{order.user?.email}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">
                              {order.serviceType}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <StatusBadge status={order.status?.toUpperCase()} />
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-muted-foreground">
                              {formatDateTime(order.createdAt)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-end gap-2">
                              {(order.status === "PENDING" || order.status === "PROVISIONING") && (
                                <Button
                                  size="sm"
                                  onClick={() => setFulfillOrder(order)}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  Fulfill
                                </Button>
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-muted-foreground hover:text-foreground"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => setViewOrder(order)}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Page {pagination.page} of {pagination.totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1 || loading}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages || loading}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <ViewOrderDialog
        order={viewOrder}
        open={!!viewOrder}
        onClose={() => setViewOrder(null)}
      />
      <FulfillmentModal
        order={fulfillOrder}
        isOpen={!!fulfillOrder}
        onClose={() => setFulfillOrder(null)}
        onSuccess={handleFulfillSuccess}
      />
    </>
  )
}
