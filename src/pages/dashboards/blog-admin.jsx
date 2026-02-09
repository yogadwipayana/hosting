import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router"
import { Helmet } from "react-helmet-async"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { blogApi, blogAdminApi } from "@/lib/api"
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  FileText,
  Calendar,
  Tag,
  MoreHorizontal,
  AlertCircle,
  CheckCircle2,
  X
} from "lucide-react"

// Status Badge Component
function StatusBadge({ published }) {
  return published ? (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
      <CheckCircle2 size={12} />
      Published
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
      <EyeOff size={12} />
      Draft
    </span>
  )
}

// Delete Confirmation Modal
function DeleteModal({ isOpen, onClose, onConfirm, blogTitle, isDeleting }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertCircle size={24} />
          <h3 className="text-lg font-semibold">Konfirmasi Hapus</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Apakah Anda yakin ingin menghapus artikel <strong>"{blogTitle}"</strong>? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Batal
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? "Menghapus..." : "Hapus"}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Main Content Component
const MainContent = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all") // all, published, draft
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, blog: null })
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch blogs and categories
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      setError("")
      try {
        const [blogsRes, categoriesRes] = await Promise.all([
          blogApi.getBlogs({ limit: 100 }),
          blogApi.getCategories()
        ])
        setBlogs(blogsRes.data.blogs)
        setCategories(categoriesRes.data.categories)
      } catch (err) {
        setError("Gagal memuat data blog. Silakan coba lagi.")
        console.error("Failed to fetch blogs:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Filter blogs
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" ? true :
                         statusFilter === "published" ? blog.published :
                         !blog.published
    const matchesCategory = categoryFilter === "all" ? true :
                           blog.category?.id === categoryFilter || blog.category?.slug === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Handle delete
  const handleDelete = async () => {
    if (!deleteModal.blog) return

    setIsDeleting(true)
    try {
      await blogAdminApi.deleteBlog(deleteModal.blog.id)
      setBlogs(blogs.filter(b => b.id !== deleteModal.blog.id))
      setDeleteModal({ isOpen: false, blog: null })
    } catch (err) {
      alert("Gagal menghapus artikel. Silakan coba lagi.")
      console.error("Failed to delete blog:", err)
    } finally {
      setIsDeleting(false)
    }
  }

  // Handle toggle publish status
  const handleTogglePublish = async (blog) => {
    try {
      await blogAdminApi.updateBlog(blog.id, {
        published: !blog.published
      })
      setBlogs(blogs.map(b => b.id === blog.id ? { ...b, published: !b.published } : b))
    } catch (err) {
      alert("Gagal mengubah status publikasi. Silakan coba lagi.")
      console.error("Failed to toggle publish:", err)
    }
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Blog</h1>
          <p className="text-gray-500">Buat, edit, dan kelola artikel blog</p>
        </div>
        <Button
          onClick={() => navigate('/dashboard/blog-admin/new')}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Artikel Baru</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Total Artikel</span>
            <FileText size={20} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold">{blogs.length}</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Published</span>
            <CheckCircle2 size={20} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold">{blogs.filter(b => b.published).length}</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Draft</span>
            <EyeOff size={20} className="text-gray-600" />
          </div>
          <p className="text-2xl font-bold">{blogs.filter(b => !b.published).length}</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Kategori</span>
            <Tag size={20} className="text-purple-600" />
          </div>
          <p className="text-2xl font-bold">{categories.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Semua Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Semua Kategori</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        /* Blog Table */
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Artikel</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Kategori</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Tanggal</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredBlogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-500">
                      {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                        ? "Tidak ada artikel yang cocok dengan filter"
                        : "Belum ada artikel. Buat artikel pertama Anda!"}
                    </td>
                  </tr>
                ) : (
                  filteredBlogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                            {blog.image ? (
                              <img src={blog.image} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <FileText size={20} className="text-gray-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 line-clamp-1">{blog.title}</p>
                            <p className="text-sm text-gray-500 line-clamp-1">{blog.excerpt || '-'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {blog.category?.name || blog.category || '-'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge published={blog.published} />
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {formatDate(blog.publishedAt)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleTogglePublish(blog)}
                            className={`p-2 rounded-lg transition-colors ${
                              blog.published
                                ? 'text-yellow-600 hover:bg-yellow-50'
                                : 'text-green-600 hover:bg-green-50'
                            }`}
                            title={blog.published ? 'Unpublish' : 'Publish'}
                          >
                            {blog.published ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                          <Link
                            to={`/dashboard/blog-admin/edit/${blog.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </Link>
                          <button
                            onClick={() => setDeleteModal({ isOpen: true, blog })}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, blog: null })}
        onConfirm={handleDelete}
        blogTitle={deleteModal.blog?.title}
        isDeleting={isDeleting}
      />
    </main>
  )
}

// Layout Wrapper
export default function BlogAdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>Kelola Blog - Dashboard</title>
      </Helmet>

      <div className="flex min-h-screen bg-background">
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activePage="/dashboard/blog-admin"
        />

        <div className="flex-1 lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
          <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />
          <MainContent />
        </div>
      </div>
    </>
  )
}
