import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, Calendar01Icon, UserIcon, Search01Icon, CancelCircleIcon } from "@hugeicons/core-free-icons"
import { Input } from "@/components/ui/input"
import { useState, useEffect, useCallback } from "react"
import { blogApi } from "@/lib/api"

// Format date helper
function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

// Hero Section
function BlogHero({ searchQuery, setSearchQuery }) {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-12 lg:pt-24 lg:pb-16">
      {/* Background - Solid Color */}
      <div className="absolute inset-0 bg-gray-50" />

      <div className="container relative mx-auto px-4 text-center">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
          <span className="text-sm font-medium text-primary">Artikel & Tutorial Terbaru</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6">
          Blog <span className="text-primary">BelajarHosting</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Temukan artikel menarik seputar deployment, server management, automation,
          dan tips teknis lainnya untuk meningkatkan skill Anda.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <HugeiconsIcon icon={Search01Icon} size={20} className="text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Cari artikel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 h-12 bg-white shadow-sm border-gray-200 focus:border-primary focus:ring-primary w-full rounded-xl"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <HugeiconsIcon icon={CancelCircleIcon} size={20} />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

// Blog Card Component
function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`}>
      <Card className="group cursor-pointer border-0 shadow-sm hover:shadow-lg transition-all h-full flex flex-col overflow-hidden bg-white">
        <div className="relative h-48 bg-gray-100 flex items-center justify-center p-6 group-hover:bg-gray-50 transition-colors">
          <img src={post.image || '/images/website-svgrepo-com.svg'} alt={post.title} className="h-20 w-20 group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary shadow-sm">
            {post.category?.name || post.category}
          </div>
        </div>

        <CardContent className="flex-1 flex flex-col p-6">
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <HugeiconsIcon icon={Calendar01Icon} size={14} />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <HugeiconsIcon icon={UserIcon} size={14} />
              <span>{post.author?.name || post.author}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-sm font-medium pt-4 border-t border-gray-100 mt-auto">
            <span className="text-muted-foreground">{post.readTime}</span>
            <span className="text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Baca Selengkapnya
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

// Main Blog Page
export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState([{ name: "All", slug: "all" }])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 })
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [hasMore, setHasMore] = useState(false)

  // Newsletter states
  const [email, setEmail] = useState("")
  const [subscribeStatus, setSubscribeStatus] = useState({ type: null, message: "" })
  const [isSubscribing, setIsSubscribing] = useState(false)

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 400)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await blogApi.getCategories()
        const apiCategories = response.data.categories.map(cat => ({
          name: cat.name,
          slug: cat.slug
        }))
        setCategories([{ name: "All", slug: "all" }, ...apiCategories])
      } catch (err) {
        console.error("Failed to fetch categories:", err)
      }
    }
    fetchCategories()
  }, [])

  // Fetch blogs when category, search, or page changes
  useEffect(() => {
    async function fetchBlogs() {
      setIsLoading(true)
      setError("")
      try {
        const params = { page: pagination.page, limit: 9 }

        // If searching, prioritize search over category
        if (debouncedSearch.trim()) {
          params.search = debouncedSearch.trim()
        } else if (activeCategory !== "All") {
          params.category = activeCategory.toLowerCase()
        }

        const response = await blogApi.getBlogs(params)

        // Append blogs if loading more (page > 1), otherwise replace
        if (pagination.page > 1) {
          setBlogs(prev => [...prev, ...response.data.blogs])
        } else {
          setBlogs(response.data.blogs)
        }

        setPagination(response.data.pagination)
        setHasMore(response.data.pagination.page < response.data.pagination.totalPages)
      } catch (err) {
        setError("Gagal memuat artikel. Silakan coba lagi.")
        console.error("Failed to fetch blogs:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBlogs()
  }, [activeCategory, debouncedSearch, pagination.page])

  // Handle category change - clear search when selecting a category
  const handleCategoryChange = useCallback((categoryName) => {
    setActiveCategory(categoryName)
    setSearchQuery("")
    setPagination({ page: 1, totalPages: 1 })
    setBlogs([])
  }, [])

  // Handle load more - increment page to trigger fetch
  const handleLoadMore = useCallback(() => {
    setPagination(prev => ({ ...prev, page: prev.page + 1 }))
  }, [])

  // Handle newsletter subscription
  const handleSubscribe = async (e) => {
    e.preventDefault()

    if (!email.trim()) {
      setSubscribeStatus({ type: "error", message: "Email wajib diisi" })
      return
    }

    setIsSubscribing(true)
    setSubscribeStatus({ type: null, message: "" })

    try {
      await blogApi.subscribeNewsletter(email)
      setSubscribeStatus({ type: "success", message: "Berhasil berlangganan! Terima kasih." })
      setEmail("")
    } catch (err) {
      const message = err.status === 409
        ? "Email sudah terdaftar"
        : err.data?.message || "Gagal berlangganan. Silakan coba lagi."
      setSubscribeStatus({ type: "error", message })
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Blog - BelajarHosting</title>
        <meta name="description" content="Kumpulan artikel dan tutorial seputar hosting, deployment, server, dan teknologi web modern." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-white">
        <BlogHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <section className="py-16">
          <div className="container mx-auto px-4">

            {/* Category Filter - Hidden when searching */}
            {!debouncedSearch && (
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategoryChange(cat.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === cat.name
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}

            {/* Search Results Header */}
            {debouncedSearch && (
              <div className="text-center mb-12">
                <p className="text-muted-foreground">
                  Hasil pencarian untuk <span className="font-medium text-foreground">"{debouncedSearch}"</span>
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setPagination({ page: 1, totalPages: 1 })
                  }}
                  className="text-primary text-sm hover:underline mt-2"
                >
                  Lihat semua artikel
                </button>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                  Coba Lagi
                </Button>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && blogs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {debouncedSearch
                    ? `Tidak ada artikel yang cocok dengan "${debouncedSearch}"`
                    : "Belum ada artikel dalam kategori ini."
                  }
                </p>
              </div>
            )}

            {/* Blogs Grid */}
            {!isLoading && !error && blogs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {blogs.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Load More */}
            {!isLoading && hasMore && !debouncedSearch && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  Muat Lebih Banyak
                </Button>
              </div>
            )}

          </div>
        </section>

        {/* Newsletter / CTA Section */}
        <section className="bg-blue-50 py-16">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Jangan Lewatkan Update Terbaru</h2>
            <p className="text-muted-foreground mb-8">
              Dapatkan notifikasi artikel dan tutorial terbaru langsung di inbox Anda.
              Tanpa spam, janji.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Email Anda"
                className="bg-white h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubscribing}
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 bg-primary hover:bg-primary/90"
                disabled={isSubscribing}
              >
                {isSubscribing ? 'Mengirim...' : 'Subscribe'}
              </Button>
            </form>
            {subscribeStatus.type && (
              <p className={`mt-4 text-sm ${subscribeStatus.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                {subscribeStatus.message}
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
