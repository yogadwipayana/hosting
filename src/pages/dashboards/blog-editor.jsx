import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { Helmet } from "react-helmet-async"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { blogApi, blogAdminApi } from "@/lib/api"
import {
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon
} from "lucide-react"

// Generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100)
}

// Main Content Component
const MainContent = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    readTime: "5 min read",
    published: false,
    categoryId: ""
  })

  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(isEditing)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(!isEditing)

  // Fetch categories and blog data (if editing)
  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesRes] = await Promise.all([
          blogApi.getCategories()
        ])
        setCategories(categoriesRes.data.categories)

        if (isEditing) {
          // In a real implementation, you would fetch the blog by ID
          // For now, we'll fetch all blogs and find the one we need
          const blogsRes = await blogApi.getBlogs({ limit: 100 })
          const blog = blogsRes.data.blogs.find(b => b.id === id || b.id === parseInt(id))

          if (blog) {
            setFormData({
              title: blog.title || "",
              slug: blog.slug || "",
              excerpt: blog.excerpt || "",
              content: blog.content || "",
              image: blog.image || "",
              readTime: blog.readTime || "5 min read",
              published: blog.published || false,
              categoryId: blog.category?.id || blog.categoryId || ""
            })
            setAutoGenerateSlug(false)
          } else {
            setError("Artikel tidak ditemukan")
          }
        }
      } catch (err) {
        setError("Gagal memuat data")
        console.error("Failed to fetch data:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [id, isEditing])

  // Auto-generate slug from title
  useEffect(() => {
    if (autoGenerateSlug && formData.title) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(formData.title)
      }))
    }
  }, [formData.title, autoGenerateSlug])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear messages when user starts typing
    setError("")
    setSuccess("")
  }

  // Handle slug manual edit
  const handleSlugChange = (e) => {
    setAutoGenerateSlug(false)
    setFormData(prev => ({
      ...prev,
      slug: e.target.value
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
    }))
  }

  // Validate form
  const validateForm = () => {
    if (!formData.title.trim()) return "Judul artikel wajib diisi"
    if (!formData.slug.trim()) return "Slug wajib diisi"
    if (!formData.excerpt.trim()) return "Excerpt wajib diisi"
    if (!formData.content.trim()) return "Konten artikel wajib diisi"
    if (!formData.categoryId) return "Kategori wajib dipilih"
    return null
  }

  // Handle save
  const handleSave = async (publish = false) => {
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsSaving(true)
    setError("")
    setSuccess("")

    try {
      const dataToSave = {
        ...formData,
        published: publish
      }

      if (isEditing) {
        await blogAdminApi.updateBlog(id, dataToSave)
      } else {
        await blogAdminApi.createBlog(dataToSave)
      }

      setSuccess(publish ? "Artikel berhasil dipublikasikan!" : "Artikel berhasil disimpan!")

      // Redirect after a short delay
      setTimeout(() => {
        navigate('/dashboard/blog-admin')
      }, 1500)
    } catch (err) {
      setError(err.message || "Gagal menyimpan artikel. Silakan coba lagi.")
      console.error("Failed to save blog:", err)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="animate-spin" size={24} />
          <span>Memuat data...</span>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard/blog-admin')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Kembali</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Edit Artikel' : 'Artikel Baru'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            <span className="hidden sm:inline">Simpan Draft</span>
            <span className="sm:hidden">Draft</span>
          </Button>
          <Button
            onClick={() => handleSave(true)}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Eye size={18} />
                <span className="hidden sm:inline">Publikasikan</span>
                <span className="sm:hidden">Publish</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <AlertCircle className="text-red-600 shrink-0" size={20} />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <CheckCircle2 className="text-green-600 shrink-0" size={20} />
          <p className="text-green-700">{success}</p>
        </div>
      )}

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-xl border p-6">
            <Label htmlFor="title" className="text-sm font-medium mb-2 block">
              Judul Artikel *
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Masukkan judul artikel"
              className="text-lg"
            />
          </div>

          {/* Slug */}
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="slug" className="text-sm font-medium">
                Slug URL *
              </Label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={autoGenerateSlug}
                  onChange={(e) => setAutoGenerateSlug(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Auto-generate dari judul
              </label>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">/blog/</span>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleSlugChange}
                placeholder="judul-artikel"
                className="flex-1"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              URL lengkap: https://belajarhosting.com/blog/{formData.slug || 'judul-artikel'}
            </p>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-xl border p-6">
            <Label htmlFor="excerpt" className="text-sm font-medium mb-2 block">
              Excerpt / Ringkasan *
            </Label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Ringkasan singkat tentang artikel (akan ditampilkan di halaman list blog)"
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              {formData.excerpt.length} karakter
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl border p-6">
            <Label htmlFor="content" className="text-sm font-medium mb-2 block">
              Konten Artikel *
            </Label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Tulis konten artikel Anda di sini..."
              rows={15}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary resize-y font-mono text-sm"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Status */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-medium mb-4">Status Publikasi</h3>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              {formData.published ? (
                <>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-green-700">Published</span>
                </>
              ) : (
                <>
                  <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                  <span className="text-sm text-gray-600">Draft</span>
                </>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-xl border p-6">
            <Label htmlFor="categoryId" className="text-sm font-medium mb-2 block">
              Kategori *
            </Label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Pilih kategori...</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-xl border p-6">
            <Label htmlFor="image" className="text-sm font-medium mb-2 block">
              URL Gambar Utama
            </Label>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ImageIcon size={18} className="text-gray-400" />
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              {formData.image && (
                <div className="aspect-video rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/images/website-svgrepo-com.svg'
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Read Time */}
          <div className="bg-white rounded-xl border p-6">
            <Label htmlFor="readTime" className="text-sm font-medium mb-2 block">
              Estimasi Waktu Baca
            </Label>
            <Input
              id="readTime"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              placeholder="5 min read"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

// Layout Wrapper
export default function BlogEditorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>{useParams().id ? 'Edit Artikel' : 'Artikel Baru'} - Dashboard</title>
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
