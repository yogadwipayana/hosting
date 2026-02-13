import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router"
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  Shield,
  User,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  RefreshCw,
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
import { cn, formatDate } from "@/lib/utils"

// User Role Badge
function RoleBadge({ role }) {
  const styles = {
    SUPER_ADMIN: "border-purple-200 text-purple-700 bg-purple-50",
    ADMIN: "border-blue-200 text-blue-700 bg-blue-50",
    USER: "border-gray-200 text-gray-700 bg-gray-50",
  }

  const icons = {
    SUPER_ADMIN: Shield,
    ADMIN: Shield,
    USER: User,
  }

  const Icon = icons[role] || User

  return (
    <Badge variant="outline" className={cn("text-xs gap-1", styles[role] || styles.USER)}>
      <Icon className="h-3 w-3" />
      {role?.toLowerCase().replace("_", " ")}
    </Badge>
  )
}

// Delete User Dialog
function DeleteUserDialog({ user, open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-destructive">Delete User</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Are you sure you want to delete <span className="text-foreground font-medium">{user?.name || user?.email}</span>?
            This action cannot be undone and will delete all associated data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-input text-muted-foreground hover:bg-muted">
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} className="bg-destructive hover:bg-destructive/90">
            Delete User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Create User Dialog
function CreateUserDialog({ open, onClose, onConfirm }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      alert('Email and password are required')
      return
    }
    setLoading(true)
    try {
      await onConfirm(formData)
      setFormData({ name: '', email: '', password: '', role: 'USER' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border shadow-lg">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new user account to the platform.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Name</p>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter user name"
              className="bg-background border-input text-foreground"
            />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Email *</p>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
              className="bg-background border-input text-foreground"
            />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Password *</p>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter password"
              className="bg-background border-input text-foreground"
            />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Role</p>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger className="bg-background border-input text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="USER" className="text-foreground focus:bg-accent focus:text-accent-foreground">User</SelectItem>
                <SelectItem value="ADMIN" className="text-foreground focus:bg-accent focus:text-accent-foreground">Admin</SelectItem>
                <SelectItem value="SUPER_ADMIN" className="text-foreground focus:bg-accent focus:text-accent-foreground">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-input text-muted-foreground hover:bg-muted" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading}>
            {loading ? 'Creating...' : 'Create User'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Edit Role Dialog
function EditRoleDialog({ user, open, onClose, onConfirm }) {
  const [role, setRole] = useState(user?.role || "USER")

  useEffect(() => {
    if (user) {
      setRole(user.role)
    }
  }, [user])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit User Role</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Change the role for <span className="text-foreground font-medium">{user?.name || user?.email}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="bg-background border-input text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="USER" className="text-foreground focus:bg-accent focus:text-accent-foreground">User</SelectItem>
              <SelectItem value="ADMIN" className="text-foreground focus:bg-accent focus:text-accent-foreground">Admin</SelectItem>
              <SelectItem value="SUPER_ADMIN" className="text-foreground focus:bg-accent focus:text-accent-foreground">Super Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-input text-muted-foreground hover:bg-muted">
            Cancel
          </Button>
          <Button onClick={() => onConfirm(role)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Main Users Page
export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [verificationFilter, setVerificationFilter] = useState("all")

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editRoleDialogOpen, setEditRoleDialogOpen] = useState(false)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: search || undefined,
        role: roleFilter !== "all" ? roleFilter : undefined,
        isVerified: verificationFilter !== "all" ? verificationFilter === "verified" : undefined,
      }
      const response = await adminApi.getUsers(params)
      setUsers(response.data.users)
      setPagination(response.data.pagination)
    } catch (err) {
      setError(err.message || "Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [pagination.page, search, roleFilter, verificationFilter])

  const handleDelete = async () => {
    if (!selectedUser) return
    try {
      await adminApi.deleteUser(selectedUser.id)
      setDeleteDialogOpen(false)
      setSelectedUser(null)
      fetchUsers()
    } catch (err) {
      alert(err.message || "Failed to delete user")
    }
  }

  const handleRoleUpdate = async (newRole) => {
    if (!selectedUser) return
    try {
      await adminApi.updateUserRole(selectedUser.id, newRole)
      setEditRoleDialogOpen(false)
      setSelectedUser(null)
      fetchUsers()
    } catch (err) {
      alert(err.message || "Failed to update role")
    }
  }

  const handleCreateUser = async (data) => {
    try {
      await adminApi.createUser(data)
      setCreateDialogOpen(false)
      fetchUsers()
    } catch (err) {
      alert(err.message || "Failed to create user")
    }
  }

  const openDeleteDialog = (user) => {
    setSelectedUser(user)
    setDeleteDialogOpen(true)
  }

  const openEditRoleDialog = (user) => {
    setSelectedUser(user)
    setEditRoleDialogOpen(true)
  }

  return (
    <>
      <Helmet>
        <title>Users - Admin - BelajarHosting</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Users</h1>
            <p className="text-muted-foreground mt-1">Manage user accounts and permissions</p>
          </div>
          <Button onClick={() => setCreateDialogOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Users className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-background border-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex gap-2">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[140px] bg-background border-input text-foreground">
                    <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all" className="text-foreground focus:bg-accent focus:text-accent-foreground">All Roles</SelectItem>
                    <SelectItem value="USER" className="text-foreground focus:bg-accent focus:text-accent-foreground">User</SelectItem>
                    <SelectItem value="ADMIN" className="text-foreground focus:bg-accent focus:text-accent-foreground">Admin</SelectItem>
                    <SelectItem value="SUPER_ADMIN" className="text-foreground focus:bg-accent focus:text-accent-foreground">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={verificationFilter} onValueChange={setVerificationFilter}>
                  <SelectTrigger className="w-[160px] bg-background border-input text-foreground">
                    <CheckCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all" className="text-foreground focus:bg-accent focus:text-accent-foreground">All Status</SelectItem>
                    <SelectItem value="verified" className="text-foreground focus:bg-accent focus:text-accent-foreground">Verified</SelectItem>
                    <SelectItem value="unverified" className="text-foreground focus:bg-accent focus:text-accent-foreground">Unverified</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={fetchUsers}
                  className="border-input text-muted-foreground hover:bg-muted"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">All Users</CardTitle>
            <CardDescription className="text-muted-foreground">
              {pagination.total} total users
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-destructive">{error}</div>
            ) : users.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No users found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">User</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Role</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Credits</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Joined</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
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
                          <RoleBadge role={user.role} />
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
                            {user.isVerified ? (
                              <><CheckCircle className="h-3 w-3 mr-1" /> Verified</>
                            ) : (
                              <><XCircle className="h-3 w-3 mr-1" /> Unverified</>
                            )}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-foreground">
                          {user.creditBalance?.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover border-border shadow-md">
                              <DropdownMenuItem
                                onClick={() => openEditRoleDialog(user)}
                                className="text-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Role
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => openDeleteDialog(user)}
                                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
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
            {!loading && !error && users.length > 0 && (
              <div className="flex items-center justify-between px-4 py-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} users
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
      <DeleteUserDialog
        user={selectedUser}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
      <EditRoleDialog
        user={selectedUser}
        open={editRoleDialogOpen}
        onClose={() => setEditRoleDialogOpen(false)}
        onConfirm={handleRoleUpdate}
      />
      <CreateUserDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onConfirm={handleCreateUser}
      />
    </>
  )
}
