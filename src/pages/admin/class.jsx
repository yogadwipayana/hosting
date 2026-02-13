import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import {
  BookOpen,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Video,
  Users,
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
import { cn, formatCurrency } from "@/lib/utils"

// Mock Data (replace with API when available)
const MOCK_CLASSES = Array.from({ length: 15 }).map((_, i) => ({
  id: `class-${i + 1}`,
  title: `Learn Web Development ${i + 1}`,
  instructor: "John Doe",
  price: 150000 * ((i % 3) + 1),
  students: 10 + (i * 5),
  status: i % 3 === 0 ? "DRAFT" : "PUBLISHED",
  category: i % 2 === 0 ? "Frontend" : "Backend",
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}))

// Class Status Badge
function StatusBadge({ status }) {
  const styles = {
    PUBLISHED: "border-green-200 text-green-700 bg-green-50",
    DRAFT: "border-yellow-200 text-yellow-700 bg-yellow-50",
    ARCHIVED: "border-gray-200 text-gray-700 bg-gray-50",
  }

  return (
    <Badge
      variant="outline"
      className={cn("text-xs", styles[status] || styles.DRAFT)}
    >
      {status}
    </Badge>
  )
}

// Delete Class Dialog
function DeleteClassDialog({ classItem, open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-destructive">Delete Class</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Are you sure you want to delete <span className="text-foreground font-medium">{classItem?.title}</span>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-input text-muted-foreground hover:bg-muted">
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} className="bg-destructive hover:bg-destructive/90">
            Delete Class
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Create Class Dialog
function CreateClassDialog({ open, onClose, onConfirm }) {
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    price: '',
    category: 'Frontend',
    status: 'DRAFT',
  })

  const handleSubmit = () => {
    if (!formData.title || !formData.instructor) {
      alert('Title and instructor are required')
      return
    }
    onConfirm({
      ...formData,
      price: parseInt(formData.price) || 0,
      students: 0,
    })
    setFormData({ title: '', instructor: '', price: '', category: 'Frontend', status: 'DRAFT' })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border shadow-lg">
        <DialogHeader>
          <DialogTitle>Create New Class</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new online course to the platform.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Title</p>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter class title"
              className="bg-background border-input text-foreground"
            />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Instructor</p>
            <Input
              value={formData.instructor}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              placeholder="Enter instructor name"
              className="bg-background border-input text-foreground"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Price (IDR)</p>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="150000"
                className="bg-background border-input text-foreground"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Category</p>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="bg-background border-input text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="Frontend" className="text-foreground focus:bg-accent focus:text-accent-foreground">Frontend</SelectItem>
                  <SelectItem value="Backend" className="text-foreground focus:bg-accent focus:text-accent-foreground">Backend</SelectItem>
                  <SelectItem value="DevOps" className="text-foreground focus:bg-accent focus:text-accent-foreground">DevOps</SelectItem>
                  <SelectItem value="Database" className="text-foreground focus:bg-accent focus:text-accent-foreground">Database</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Status</p>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="bg-background border-input text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="DRAFT" className="text-foreground focus:bg-accent focus:text-accent-foreground">Draft</SelectItem>
                <SelectItem value="PUBLISHED" className="text-foreground focus:bg-accent focus:text-accent-foreground">Published</SelectItem>
                <SelectItem value="ARCHIVED" className="text-foreground focus:bg-accent focus:text-accent-foreground">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-input text-muted-foreground hover:bg-muted">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Create Class
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Edit Class Dialog
function EditClassDialog({ classItem, open, onClose, onConfirm }) {
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    price: '',
    category: '',
    status: '',
  })

  useEffect(() => {
    if (classItem) {
      setFormData({
        title: classItem.title || '',
        instructor: classItem.instructor || '',
        price: classItem.price?.toString() || '',
        category: classItem.category || 'Frontend',
        status: classItem.status || 'DRAFT',
      })
    }
  }, [classItem])

  const handleSubmit = () => {
    if (!formData.title || !formData.instructor) {
      alert('Title and instructor are required')
      return
    }
    onConfirm({
      ...formData,
      price: parseInt(formData.price) || 0,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border shadow-lg">
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update class details for <span className="text-foreground font-medium">{classItem?.title}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Title</p>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter class title"
              className="bg-background border-input text-foreground"
            />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Instructor</p>
            <Input
              value={formData.instructor}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              placeholder="Enter instructor name"
              className="bg-background border-input text-foreground"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Price (IDR)</p>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="150000"
                className="bg-background border-input text-foreground"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Category</p>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="bg-background border-input text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="Frontend" className="text-foreground focus:bg-accent focus:text-accent-foreground">Frontend</SelectItem>
                  <SelectItem value="Backend" className="text-foreground focus:bg-accent focus:text-accent-foreground">Backend</SelectItem>
                  <SelectItem value="DevOps" className="text-foreground focus:bg-accent focus:text-accent-foreground">DevOps</SelectItem>
                  <SelectItem value="Database" className="text-foreground focus:bg-accent focus:text-accent-foreground">Database</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Status</p>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="bg-background border-input text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="DRAFT" className="text-foreground focus:bg-accent focus:text-accent-foreground">Draft</SelectItem>
                <SelectItem value="PUBLISHED" className="text-foreground focus:bg-accent focus:text-accent-foreground">Published</SelectItem>
                <SelectItem value="ARCHIVED" className="text-foreground focus:bg-accent focus:text-accent-foreground">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-input text-muted-foreground hover:bg-muted">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Main Classes Page
export default function AdminClassesPage() {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)

  // Simulate API call
  const fetchClasses = async () => {
    setLoading(true)
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500))

    let filtered = [...MOCK_CLASSES]

    if (search) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.instructor.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(c => c.status === statusFilter)
    }

    const start = (pagination.page - 1) * pagination.limit
    const end = start + pagination.limit
    const paginated = filtered.slice(start, end)

    setClasses(paginated)
    setPagination(p => ({
      ...p,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / p.limit)
    }))
    setLoading(false)
  }

  useEffect(() => {
    fetchClasses()
  }, [pagination.page, search, statusFilter])

  const handleDelete = () => {
    if (!selectedClass) return
    // Implement delete logic here
    alert(`Deleted class: ${selectedClass.title}`)
    setDeleteDialogOpen(false)
    setSelectedClass(null)
    fetchClasses()
  }

  const handleCreate = (data) => {
    // Implement create logic here (mock for now)
    alert(`Created class: ${data.title}`)
    setCreateDialogOpen(false)
    fetchClasses()
  }

  const handleEdit = (data) => {
    // Implement edit logic here (mock for now)
    alert(`Updated class: ${data.title}`)
    setEditDialogOpen(false)
    setSelectedClass(null)
    fetchClasses()
  }

  const openDeleteDialog = (classItem) => {
    setSelectedClass(classItem)
    setDeleteDialogOpen(true)
  }

  const openEditDialog = (classItem) => {
    setSelectedClass(classItem)
    setEditDialogOpen(true)
  }

  return (
    <>
      <Helmet>
        <title>Classes - Admin - BelajarHosting</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Classes</h1>
            <p className="text-muted-foreground mt-1">Manage online courses and tutorials</p>
          </div>
          <Button onClick={() => setCreateDialogOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Create Class
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search classes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-background border-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px] bg-background border-input text-foreground">
                    <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all" className="text-foreground focus:bg-accent focus:text-accent-foreground">All Status</SelectItem>
                    <SelectItem value="PUBLISHED" className="text-foreground focus:bg-accent focus:text-accent-foreground">Published</SelectItem>
                    <SelectItem value="DRAFT" className="text-foreground focus:bg-accent focus:text-accent-foreground">Draft</SelectItem>
                    <SelectItem value="ARCHIVED" className="text-foreground focus:bg-accent focus:text-accent-foreground">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={fetchClasses}
                  className="border-input text-muted-foreground hover:bg-muted"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Classes Table */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">All Classes</CardTitle>
            <CardDescription className="text-muted-foreground">
              {pagination.total} total classes
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : classes.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No classes found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Class</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Instructor</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Students</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Price</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map((item) => (
                      <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Video className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{item.title}</p>
                              <p className="text-xs text-muted-foreground">{item.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-foreground">
                          {item.instructor}
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge status={item.status} />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-3 w-3 mr-1" />
                            {item.students}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right text-sm font-medium text-foreground">
                          {formatCurrency(item.price)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover border-border shadow-md">
                              <DropdownMenuItem onClick={() => openEditDialog(item)} className="text-foreground focus:bg-accent focus:text-accent-foreground">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Class
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => openDeleteDialog(item)}
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
            {!loading && classes.length > 0 && (
              <div className="flex items-center justify-between px-4 py-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} classes
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
      <DeleteClassDialog
        classItem={selectedClass}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
      <CreateClassDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onConfirm={handleCreate}
      />
      <EditClassDialog
        classItem={selectedClass}
        open={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false)
          setSelectedClass(null)
        }}
        onConfirm={handleEdit}
      />
    </>
  )
}
