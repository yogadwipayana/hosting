import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import { bookmarkApi } from "@/lib/api"
import { toast } from "sonner"
import {
  Bookmark,
  ExternalLink,
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Loader2
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Bookmark Form Component
function BookmarkForm({ bookmark, categories, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState({
    title: bookmark?.title || "",
    url: bookmark?.url || "",
    description: bookmark?.description || "",
    category: bookmark?.category || "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g., Dokploy Documentation"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL *</Label>
        <Input
          id="url"
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          placeholder="https://example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="e.g., Documentation"
          list="categories"
        />
        <datalist id="categories">
          {categories.map((cat) => (
            <option key={cat} value={cat} />
          ))}
        </datalist>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Brief description of this bookmark"
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {bookmark ? "Update" : "Create"} Bookmark
        </Button>
      </DialogFooter>
    </form>
  )
}

// Delete Confirmation Dialog
function DeleteDialog({ bookmark, isOpen, onClose, onConfirm, isDeleting }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Bookmark</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{bookmark?.title}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Main Content Component
const MainContent = () => {
  const [bookmarks, setBookmarks] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedBookmark, setSelectedBookmark] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch bookmarks
  const fetchBookmarks = useCallback(async () => {
    try {
      setIsLoading(true)
      const params = {}
      if (searchQuery) params.search = searchQuery
      if (selectedCategory !== "All") params.category = selectedCategory

      const response = await bookmarkApi.getBookmarks(params)
      setBookmarks(response.data.bookmarks)
    } catch (error) {
      toast.error(error.message || "Failed to load bookmarks")
    } finally {
      setIsLoading(false)
    }
  }, [searchQuery, selectedCategory, toast])

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await bookmarkApi.getCategories()
      setCategories(response.data.categories)
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    }
  }, [])

  // Initial load
  useEffect(() => {
    fetchBookmarks()
    fetchCategories()
  }, [fetchBookmarks, fetchCategories])

  // Handle create
  const handleCreate = async (formData) => {
    try {
      setIsSubmitting(true)
      await bookmarkApi.createBookmark(formData)
      toast.success("Bookmark created successfully")
      setIsCreateModalOpen(false)
      fetchBookmarks()
      fetchCategories()
    } catch (error) {
      toast.error(error.message || "Failed to create bookmark")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle update
  const handleUpdate = async (formData) => {
    try {
      setIsSubmitting(true)
      await bookmarkApi.updateBookmark(selectedBookmark.id, formData)
      toast.success("Bookmark updated successfully")
      setIsEditModalOpen(false)
      setSelectedBookmark(null)
      fetchBookmarks()
      fetchCategories()
    } catch (error) {
      toast.error(error.message || "Failed to update bookmark")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle delete
  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await bookmarkApi.deleteBookmark(selectedBookmark.id)
      toast.success("Bookmark deleted successfully")
      setIsDeleteDialogOpen(false)
      setSelectedBookmark(null)
      fetchBookmarks()
      fetchCategories()
    } catch (error) {
      toast.error(error.message || "Failed to delete bookmark")
    } finally {
      setIsDeleting(false)
    }
  }

  // Open edit modal
  const openEditModal = (bookmark) => {
    setSelectedBookmark(bookmark)
    setIsEditModalOpen(true)
  }

  // Open delete dialog
  const openDeleteDialog = (bookmark) => {
    setSelectedBookmark(bookmark)
    setIsDeleteDialogOpen(true)
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookmarks</h1>
          <p className="text-gray-500">Kumpulan link dan resource favorit anda</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari bookmark..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full sm:w-64 text-sm"
            />
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Plus size={18} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === "All"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="p-4 rounded-full bg-gray-100 mb-4">
            <Bookmark className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No bookmarks yet</h3>
          <p className="text-gray-500 mb-4">Start by adding your first bookmark</p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={18} />
            <span>Add Bookmark</span>
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all hover:border-blue-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Bookmark size={24} />
                </div>
                <div className="flex items-center gap-1">
                  {bookmark.category && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {bookmark.category}
                    </span>
                  )}
                  <button
                    onClick={() => openEditModal(bookmark)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => openDeleteDialog(bookmark)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                {bookmark.title}
              </h3>
              <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                {bookmark.description || "No description provided"}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <span className="text-xs text-gray-400">
                  Added {bookmark.dateAdded}
                </span>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Visit Link
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}

          {/* Add New Placeholder Card */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-gray-400 hover:text-blue-600 min-h-[200px]"
          >
            <div className="p-4 rounded-full bg-gray-50 mb-4">
              <Plus className="h-8 w-8" />
            </div>
            <span className="font-medium">Tambah Bookmark Baru</span>
          </button>
        </div>
      )}

      {/* Create Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Bookmark</DialogTitle>
            <DialogDescription>
              Add a new bookmark to your collection.
            </DialogDescription>
          </DialogHeader>
          <BookmarkForm
            categories={categories}
            onSubmit={handleCreate}
            onCancel={() => setIsCreateModalOpen(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Bookmark</DialogTitle>
            <DialogDescription>
              Update your bookmark details.
            </DialogDescription>
          </DialogHeader>
          <BookmarkForm
            bookmark={selectedBookmark}
            categories={categories}
            onSubmit={handleUpdate}
            onCancel={() => {
              setIsEditModalOpen(false)
              setSelectedBookmark(null)
            }}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <DeleteDialog
        bookmark={selectedBookmark}
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setSelectedBookmark(null)
        }}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </main>
  )
}

export default function BookmarkDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>Bookmarks - BelajarHosting</title>
      </Helmet>

      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activePage="/dashboard/bookmark"
        />

        <div className="flex-1 lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
          <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />
          <MainContent />
        </div>
      </div>
    </>
  )
}
