import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { toast } from "sonner"
import {
  CreditCard,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Eye,
  Download,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { adminApi } from "@/lib/api"
import { cn, formatCurrency, formatDateTime } from "@/lib/utils"

// Status Badge
function StatusBadge({ status }) {
  const styles = {
    SUCCESS: "border-green-800 text-green-400 bg-green-950/30",
    FAILED: "border-red-800 text-red-400 bg-red-950/30",
    PENDING: "border-yellow-800 text-yellow-400 bg-yellow-950/30",
    CANCELLED: "border-gray-700 text-gray-400 bg-gray-900",
  }

  const icons = {
    SUCCESS: CheckCircle,
    FAILED: XCircle,
    PENDING: Clock,
    CANCELLED: XCircle,
  }

  const Icon = icons[status] || Clock

  return (
    <Badge variant="outline" className={cn("text-xs gap-1", styles[status] || styles.PENDING)}>
      <Icon className="h-3 w-3" />
      {status?.toLowerCase()}
    </Badge>
  )
}

// Type Badge
function TypeBadge({ type }) {
  return (
    <div className={cn(
      "flex items-center gap-1 text-sm font-medium",
      type === "CREDIT" ? "text-green-400" : "text-red-400"
    )}>
      {type === "CREDIT" ? (
        <ArrowUpRight className="h-4 w-4" />
      ) : (
        <ArrowDownRight className="h-4 w-4" />
      )}
      {type?.toLowerCase()}
    </div>
  )
}

// View Transaction Dialog
function ViewTransactionDialog({ transaction, open, onClose }) {
  if (!transaction) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-950 border-gray-800 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription className="text-gray-400">
            Transaction ID: {transaction.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
            <span className="text-gray-400">Amount</span>
            <span className={cn(
              "text-xl font-bold",
              transaction.type === "CREDIT" ? "text-green-400" : "text-red-400"
            )}>
              {transaction.type === "CREDIT" ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <TypeBadge type={transaction.type} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <StatusBadge status={transaction.status} />
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Description</p>
            <p className="text-white mt-1">{transaction.description}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">User</p>
            <p className="text-white mt-1">{transaction.user?.name || transaction.user?.email}</p>
            <p className="text-sm text-gray-400">{transaction.user?.email}</p>
          </div>

          {transaction.paymentMethod && (
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="text-white mt-1">{transaction.paymentMethod}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Created</p>
              <p className="text-white">{formatDateTime(transaction.createdAt)}</p>
            </div>
            {transaction.processedAt && (
              <div>
                <p className="text-sm text-gray-500">Processed</p>
                <p className="text-white">{formatDateTime(transaction.processedAt)}</p>
              </div>
            )}
          </div>

          {transaction.metadata && (
            <div>
              <p className="text-sm text-gray-500">Metadata</p>
              <pre className="text-xs text-gray-400 bg-gray-900 p-2 rounded mt-1 overflow-auto">
                {JSON.stringify(transaction.metadata, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Update Status Dialog
function UpdateStatusDialog({ transaction, open, onClose, onConfirm }) {
  const [status, setStatus] = useState(transaction?.status || "PENDING")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (transaction) {
      setStatus(transaction.status)
      setDescription("")
    }
  }, [transaction])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-950 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Update Transaction Status</DialogTitle>
          <DialogDescription className="text-gray-400">
            Update status for transaction by {transaction?.user?.email}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <p className="text-sm text-gray-500 mb-2">New Status</p>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-gray-900 border-gray-800 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800">
                <SelectItem value="PENDING" className="text-white">Pending</SelectItem>
                <SelectItem value="SUCCESS" className="text-white">Success</SelectItem>
                <SelectItem value="FAILED" className="text-white">Failed</SelectItem>
                <SelectItem value="CANCELLED" className="text-white">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Note (optional)</p>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a note about this status change"
              className="bg-gray-900 border-gray-800 text-white"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-gray-700 text-gray-300 hover:bg-gray-900">
            Cancel
          </Button>
          <Button onClick={() => onConfirm(status, description)} className="bg-blue-600 hover:bg-blue-700">
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Main Transactions Page
export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [updateStatusDialogOpen, setUpdateStatusDialogOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [updatingTransactionId, setUpdatingTransactionId] = useState(null)

  // Handle status update
  const handleStatusUpdate = async (transactionId, newStatus, currentStatus) => {
    // Prevent unnecessary updates
    if (currentStatus === newStatus) return

    setUpdatingTransactionId(transactionId)
    try {
      await adminApi.updateTransactionStatus(transactionId, newStatus)
      toast.success('Transaction status updated successfully')
      fetchTransactions() // Refresh data
    } catch (err) {
      toast.error(err.message || 'Failed to update transaction status')
    } finally {
      setUpdatingTransactionId(null)
    }
  }

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: search || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        type: typeFilter !== "all" ? typeFilter : undefined,
      }
      const response = await adminApi.getTransactions(params)
      setTransactions(response.data.transactions)
      setPagination(response.data.pagination)
    } catch (err) {
      setError(err.message || "Failed to load transactions")
    } finally {
      setLoading(false)
    }
  }

  const handleExportCSV = async () => {
    try {
      // Fetch all transactions for export
      const params = {
        page: 1,
        limit: 1000,
        search: search || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        type: typeFilter !== "all" ? typeFilter : undefined,
      }
      const response = await adminApi.getTransactions(params)
      const allTransactions = response.data.transactions

      // Create CSV content
      const headers = ['ID', 'Date', 'User', 'Email', 'Type', 'Amount', 'Status', 'Description']
      const rows = allTransactions.map(tx => [
        tx.id,
        new Date(tx.createdAt).toISOString(),
        tx.user?.name || '',
        tx.user?.email || '',
        tx.type,
        tx.amount,
        tx.status,
        tx.description || ''
      ])

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      ].join('\n')

      // Create and download blob
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      alert(err.message || "Failed to export transactions")
    }
  }

  const openViewDialog = (transaction) => {
    setSelectedTransaction(transaction)
    setViewDialogOpen(true)
  }

  useEffect(() => {
    fetchTransactions()
  }, [pagination.page, search, statusFilter, typeFilter])

  return (
    <>
      <Helmet>
        <title>Transactions - Admin - BelajarHosting</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
            <p className="text-muted-foreground mt-1">Monitor financial activity and user top-ups</p>
          </div>
          <Button variant="outline" onClick={handleExportCSV} className="border-input text-foreground hover:bg-muted">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-background border-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[140px] bg-background border-input text-foreground">
                    <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all" className="text-foreground focus:bg-accent focus:text-accent-foreground">All Types</SelectItem>
                    <SelectItem value="CREDIT" className="text-foreground focus:bg-accent focus:text-accent-foreground">Credit</SelectItem>
                    <SelectItem value="DEBIT" className="text-foreground focus:bg-accent focus:text-accent-foreground">Debit</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px] bg-background border-input text-foreground">
                    <CheckCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all" className="text-foreground focus:bg-accent focus:text-accent-foreground">All Status</SelectItem>
                    <SelectItem value="SUCCESS" className="text-foreground focus:bg-accent focus:text-accent-foreground">Success</SelectItem>
                    <SelectItem value="PENDING" className="text-foreground focus:bg-accent focus:text-accent-foreground">Pending</SelectItem>
                    <SelectItem value="FAILED" className="text-foreground focus:bg-accent focus:text-accent-foreground">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={fetchTransactions}
                  className="border-input text-muted-foreground hover:bg-muted"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">All Transactions</CardTitle>
            <CardDescription className="text-muted-foreground">
              {pagination.total} total transactions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-destructive">{error}</div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No transactions found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Transaction</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">User</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Type</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Date</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Amount</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Status</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "h-8 w-8 rounded-full flex items-center justify-center",
                              tx.type === "CREDIT" ? "bg-green-100" : "bg-red-100"
                            )}>
                              {tx.type === "CREDIT" ? (
                                <ArrowDownRight className="h-4 w-4 text-green-600" />
                              ) : (
                                <ArrowUpRight className="h-4 w-4 text-red-600" />
                              )}
                            </div>
                            <div className="max-w-[200px]">
                              <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                              <p className="text-xs text-muted-foreground truncate font-mono">{tx.id.substring(0, 8)}...</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-xs font-medium text-primary">
                                {tx.user?.name?.charAt(0)?.toUpperCase()}
                              </span>
                            </div>
                            <span className="text-sm text-foreground">{tx.user?.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="text-xs border-input text-muted-foreground">
                            {tx.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {formatDateTime(tx.createdAt)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className={cn(
                            "text-sm font-medium",
                            tx.type === "CREDIT" ? "text-green-600" : "text-red-600"
                          )}>
                            {tx.type === "CREDIT" ? "+" : "-"}{formatCurrency(tx.amount)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Select
                            value={tx.status}
                            onValueChange={(newStatus) => handleStatusUpdate(tx.id, newStatus, tx.status)}
                            disabled={updatingTransactionId === tx.id}
                          >
                            <SelectTrigger className={cn(
                              "w-[130px] h-8 border",
                              tx.status === "SUCCESS" && "border-green-800 text-green-400 bg-green-950/30",
                              tx.status === "FAILED" && "border-red-800 text-red-400 bg-red-950/30",
                              tx.status === "PENDING" && "border-yellow-800 text-yellow-400 bg-yellow-950/30",
                              tx.status === "CANCELLED" && "border-gray-700 text-gray-400 bg-gray-900"
                            )}>
                              {updatingTransactionId === tx.id ? (
                                <div className="flex items-center gap-2">
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                  <span>Updating...</span>
                                </div>
                              ) : (
                                <SelectValue />
                              )}
                            </SelectTrigger>
                            <SelectContent className="bg-popover border-border">
                              <SelectItem value="PENDING" className="text-yellow-400 focus:bg-yellow-950/30 focus:text-yellow-400">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3 w-3" />
                                  Pending
                                </div>
                              </SelectItem>
                              <SelectItem value="SUCCESS" className="text-green-400 focus:bg-green-950/30 focus:text-green-400">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3" />
                                  Success
                                </div>
                              </SelectItem>
                              <SelectItem value="FAILED" className="text-red-400 focus:bg-red-950/30 focus:text-red-400">
                                <div className="flex items-center gap-2">
                                  <XCircle className="h-3 w-3" />
                                  Failed
                                </div>
                              </SelectItem>
                              <SelectItem value="CANCELLED" className="text-gray-400 focus:bg-gray-900 focus:text-gray-400">
                                <div className="flex items-center gap-2">
                                  <XCircle className="h-3 w-3" />
                                  Cancelled
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover border-border shadow-md">
                              <DropdownMenuItem onClick={() => openViewDialog(tx)} className="text-foreground focus:bg-accent focus:text-accent-foreground">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {!loading && !error && transactions.length > 0 && (
              <div className="flex items-center justify-between px-4 py-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} transactions
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                    disabled={pagination.page <= 1}
                    className="border-input text-muted-foreground hover:bg-muted disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                    disabled={pagination.page >= pagination.totalPages}
                    className="border-input text-muted-foreground hover:bg-muted disabled:opacity-50"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <ViewTransactionDialog
        transaction={selectedTransaction}
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
      />
    </>
  )
}
