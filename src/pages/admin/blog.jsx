import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router"
import {
  FileText,
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ExternalLink,
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
import { adminApi, blogAdminApi } from "@/lib/api"
import { cn, formatDate } from "@/lib/utils"

// Blog Status Badge
function StatusBadge({ isPublished }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs",
        isPublished
          ? "border-green-200 text-green-700 bg-green-50"
          : "border-yellow-200 text-yellow-700 bg-yellow-50"
      )}
    >
      {isPublished ? (
        <><Eye className="h-3 w-3 mr-1" /> Published</>
      ) : (
        <><EyeOff className="h-3 w-3 mr-1" /> Draft</>
      )}
    </Badge>
  )
}

// Delete Blog Dialog
function DeleteBlogDialog({ blog, open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-destructive">Delete Blog</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Are you sure you want to delete <span className="text-foreground font-medium">{blog?.title}</span>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-input text-muted-foreground hover:bg-muted">
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} className="bg-destructive hover:bg-destructive/90">
            Delete Blog
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Main Blogs Page
export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState(null)

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: search || undefined,
        category: categoryFilter !== "all" ? categoryFilter : undefined,
        isPublished: statusFilter !== "all" ? statusFilter === "published" : undefined,
      }
      const response = await adminApi.getBlogs(params)
      setBlogs(response.data.blogs)
      setPagination(response.data.pagination)
    } catch (err) {
      setError(err.message || "Failed to load blogs")
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await adminApi.getCategories()
      setCategories(response.data.categories)
    } catch (err) {
      console.error("Failed to load categories", err)
    }
  }

  useEffect(() => {
    fetchBlogs()
    fetchCategories()
  }, [pagination.page, search, categoryFilter, statusFilter])

  const handleTogglePublish = async (blog) => {
    try {
      await adminApi.toggleBlogPublish(blog.id)
      fetchBlogs()
    } catch (err) {
      alert(err.message || "Failed to update blog status")
    }
  }

  const handleDelete = async () => {
    if (!selectedBlog) return
    try {
      await blogAdminApi.deleteBlog(selectedBlog.id)
      setDeleteDialogOpen(false)
      setSelectedBlog(null)
      fetchBlogs()
    } catch (err) {
      alert(err.message || "Failed to delete blog")
    }
  }

  const openDeleteDialog = (blog) => {
    setSelectedBlog(blog)
    setDeleteDialogOpen(true)
  }

  return (
    <>
      <Helmet>
        <title>Blogs - Admin - BelajarHosting</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Blogs</h1>
            <p className="text-muted-foreground mt-1">Manage blog posts and content</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <Link to="/admin/blogs/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Blog
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search blogs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-background border-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[160px] bg-background border-input text-foreground">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all" className="text-foreground focus:bg-accent focus:text-accent-foreground">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.slug} className="text-foreground focus:bg-accent focus:text-accent-foreground">
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px] bg-background border-input text-foreground">
                    <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all" className="text-foreground focus:bg-accent focus:text-accent-foreground">All Status</SelectItem>
                    <SelectItem value="published" className="text-foreground focus:bg-accent focus:text-accent-foreground">Published</SelectItem>
                    <SelectItem value="draft" className="text-foreground focus:bg-accent focus:text-accent-foreground">Draft</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={fetchBlogs}
                  className="border-input text-muted-foreground hover:bg-muted"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blogs Table */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">All Blogs</CardTitle>
            <CardDescription className="text-muted-foreground">
              {pagination.total} total blogs
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-destructive">{error}</div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No blogs found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Blog</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Category</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Author</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Published</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map((blog) => (
                      <tr key={blog.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            {blog.image ? (
                              <img
                                src={blog.image}
                                alt={blog.title}
                                className="h-10 w-10 rounded-lg object-cover bg-muted"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground truncate max-w-[200px]">{blog.title}</p>
                              <p className="text-xs text-muted-foreground truncate max-w-[200px]">/{blog.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="text-xs border-input text-muted-foreground">
                            {blog.category?.name || "Uncategorized"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-foreground">
                          {blog.author?.name || blog.author?.email}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <StatusBadge isPublished={blog.isPublished} />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleTogglePublish(blog)}
                              className={cn(
                                "text-xs",
                                blog.isPublished
                                  ? "text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                                  : "text-green-600 hover:text-green-700 hover:bg-green-50"
                              )}
                            >
                              {blog.isPublished ? "Unpublish" : "Publish"}
                            </Button>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {blog.publishedAt ? formatDate(blog.publishedAt) : "-"}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover border-border shadow-md">
                              <DropdownMenuItem asChild className="text-foreground focus:bg-accent focus:text-accent-foreground">
                                <Link to={`/blog/${blog.slug}`} target="_blank">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild className="text-foreground focus:bg-accent focus:text-accent-foreground">
                                <Link to={`/admin/blogs/edit/${blog.id}`}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => openDeleteDialog(blog)}
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
            {!loading && !error && blogs.length > 0 && (
              <div className="flex items-center justify-between px-4 py-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} blogs
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
      <DeleteBlogDialog
        blog={selectedBlog}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  )
}
