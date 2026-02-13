import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router"
import {
  Users,
  FileText,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { adminApi } from "@/lib/api"
import { cn, formatCurrency, formatDate } from "@/lib/utils"

// Stat Card Component
function StatCard({ title, value, description, icon: Icon, trend, trendValue, href }) {
  const isPositive = trend === "up"

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className={cn(
            "flex items-center text-xs mt-2",
            isPositive ? "text-green-600" : "text-red-600"
          )}>
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-1" />
            )}
            {trendValue}
          </div>
        )}
        {href && (
          <Link to={href} className="text-xs text-blue-600 hover:text-blue-500 mt-2 inline-flex items-center">
            View all <ArrowUpRight className="h-3 w-3 ml-1" />
          </Link>
        )}
      </CardContent>
    </Card>
  )
}

// Recent Users Table
function RecentUsersTable({ users }) {
  if (!users?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No recent users
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">User</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Status</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Joined</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/50">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{user.name || "Unnamed"}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    user.isVerified
                      ? "border-green-200 text-green-700 bg-green-50"
                      : "border-yellow-200 text-yellow-700 bg-yellow-50"
                  )}
                >
                  {user.isVerified ? "Verified" : "Unverified"}
                </Badge>
              </td>
              <td className="py-3 px-4 text-sm text-muted-foreground">
                {formatDate(user.createdAt)}
              </td>
              <td className="py-3 px-4 text-right">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" asChild>
                  <Link to={`/admin/users?id=${user.id}`}>View</Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Recent Transactions Table
function RecentTransactionsTable({ transactions }) {
  if (!transactions?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No recent transactions
      </div>
    )
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "FAILED":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusBadge = (status) => {
    const styles = {
      SUCCESS: "border-green-200 text-green-700 bg-green-50",
      FAILED: "border-red-200 text-red-700 bg-red-50",
      PENDING: "border-yellow-200 text-yellow-700 bg-yellow-50",
      CANCELLED: "border-gray-200 text-gray-700 bg-gray-50",
    }
    return (
      <Badge variant="outline" className={cn("text-xs", styles[status] || styles.PENDING)}>
        {status?.toLowerCase()}
      </Badge>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Transaction</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">User</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Amount</th>
            <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-b border-border last:border-0 hover:bg-muted/50">
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(tx.status)}
                  <div>
                    <p className="text-sm font-medium text-foreground truncate max-w-[150px]">
                      {tx.description}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatDate(tx.createdAt)}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <p className="text-sm text-muted-foreground">{tx.user?.name || tx.user?.email}</p>
              </td>
              <td className="py-3 px-4 text-right">
                <span className={cn(
                  "text-sm font-medium",
                  tx.type === "CREDIT" ? "text-green-600" : "text-red-600"
                )}>
                  {tx.type === "CREDIT" ? "+" : "-"}{formatCurrency(tx.amount)}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                {getStatusBadge(tx.status)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Quick Actions Component
function QuickActions() {
  const actions = [
    { name: "Add User", href: "/admin/users?action=create", color: "bg-blue-600 hover:bg-blue-700 text-white" },
    { name: "Create Blog", href: "/admin/blogs?action=create", color: "bg-gray-900 hover:bg-gray-800 text-white" },
    { name: "View Reports", href: "/admin/transactions", color: "bg-gray-900 hover:bg-gray-800 text-white" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {actions.map((action) => (
        <Button
          key={action.name}
          asChild
          className={cn("", action.color)}
        >
          <Link to={action.href}>{action.name}</Link>
        </Button>
      ))}
    </div>
  )
}

// Main Dashboard Component
export default function AdminOverviewPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const response = await adminApi.getDashboardStats()
        setStats(response.data)
      } catch (err) {
        setError(err.message || "Failed to load dashboard stats")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">{error}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - BelajarHosting</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your platform performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={stats?.stats?.totalUsers?.toLocaleString() || "0"}
            icon={Users}
            href="/admin/users"
          />
          <StatCard
            title="Total Blogs"
            value={stats?.stats?.totalBlogs?.toLocaleString() || "0"}
            icon={FileText}
            href="/admin/blogs"
          />
          <StatCard
            title="Total Revenue"
            value={formatCurrency(stats?.stats?.totalRevenue || 0)}
            icon={TrendingUp}
            description="Lifetime revenue"
          />
          <StatCard
            title="Pending Transactions"
            value={stats?.stats?.pendingTransactions?.toString() || "0"}
            icon={CreditCard}
            description="Awaiting approval"
            href="/admin/transactions"
          />
        </div>

        {/* Quick Actions */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
            <CardDescription className="text-muted-foreground">Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <QuickActions />
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Users */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Recent Users</CardTitle>
                <CardDescription className="text-muted-foreground">Newly registered users</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" asChild>
                <Link to="/admin/users">View all</Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <RecentUsersTable users={stats?.recentUsers} />
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Recent Transactions</CardTitle>
                <CardDescription className="text-muted-foreground">Latest credit transactions</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" asChild>
                <Link to="/admin/transactions">View all</Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <RecentTransactionsTable transactions={stats?.recentTransactions} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
