import { useParams, Link, useNavigate } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, Calendar01Icon, UserIcon, Tag01Icon, Clock01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { useState, useEffect } from "react"
import { blogApi } from "@/lib/api"

// Format date helper
function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Related Blog Card
function RelatedBlogCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-all overflow-hidden">
        <div className="relative h-40 bg-gray-100 flex items-center justify-center p-4">
          <img
            src={post.image || '/images/website-svgrepo-com.svg'}
            alt={post.title}
            className="h-16 w-16 group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <HugeiconsIcon icon={Calendar01Icon} size={12} />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <h4 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h4>
        </div>
      </div>
    </Link>
  )
}

// Loading Skeleton
function BlogDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-8" />
        <div className="max-w-3xl mx-auto">
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-8" />
          <div className="h-64 bg-gray-200 rounded animate-pulse mb-8" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Blog Detail Page
export default function BlogDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch blog detail
  useEffect(() => {
    async function fetchBlog() {
      setIsLoading(true)
      setError("")
      try {
        const response = await blogApi.getBlogBySlug(slug)
        setBlog(response.data.blog)
      } catch (err) {
        setError("Artikel tidak ditemukan atau telah dihapus.")
        console.error("Failed to fetch blog:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBlog()
  }, [slug])

  // Fetch related blogs
  useEffect(() => {
    async function fetchRelated() {
      if (!blog) return
      try {
        const params = { limit: 3 }
        if (blog.category?.slug) {
          params.category = blog.category.slug
        }
        const response = await blogApi.getBlogs(params)
        // Filter out current blog
        const filtered = response.data.blogs.filter(b => b.slug !== slug).slice(0, 3)
        setRelatedBlogs(filtered)
      } catch (err) {
        console.error("Failed to fetch related blogs:", err)
      }
    }
    fetchRelated()
  }, [blog, slug])

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Memuat Artikel... - BelajarHosting</title>
        </Helmet>
        <Navbar />
        <BlogDetailSkeleton />
        <Footer />
      </>
    )
  }

  if (error || !blog) {
    return (
      <>
        <Helmet>
          <title>Artikel Tidak Ditemukan - BelajarHosting</title>
        </Helmet>
        <Navbar />
        <main className="min-h-screen bg-white">
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="max-w-md mx-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Artikel Tidak Ditemukan</h1>
              <p className="text-muted-foreground mb-8">{error || "Artikel yang Anda cari tidak tersedia atau telah dihapus."}</p>
              <Button onClick={() => navigate('/blog')} className="rounded-full">
                <HugeiconsIcon icon={ArrowLeft01Icon} size={18} className="mr-2" />
                Kembali ke Blog
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} - BelajarHosting Blog</title>
        <meta name="description" content={blog.excerpt || blog.title} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt || blog.title} />
        {blog.image && <meta property="og:image" content={blog.image} />}
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Back Navigation */}
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/blog')}
            className="text-muted-foreground hover:text-foreground -ml-2"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={18} className="mr-2" />
            Kembali ke Blog
          </Button>
        </div>

        {/* Article Header */}
        <article className="container mx-auto px-4 pb-16">
          <div className="max-w-3xl mx-auto">
            {/* Category Badge */}
            <div className="mb-4">
              <Link
                to={`/blog?category=${blog.category?.slug || 'all'}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                <HugeiconsIcon icon={Tag01Icon} size={14} />
                {blog.category?.name || blog.category}
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <HugeiconsIcon icon={UserIcon} size={16} className="text-primary" />
                </div>
                <span className="font-medium text-foreground">{blog.author?.name || blog.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HugeiconsIcon icon={Calendar01Icon} size={16} />
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HugeiconsIcon icon={Clock01Icon} size={16} />
                <span>{blog.readTime || '5 min read'}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-64 md:h-96 bg-gray-100 rounded-2xl mb-10 flex items-center justify-center overflow-hidden">
              <img
                src={blog.image || '/images/website-svgrepo-com.svg'}
                alt={blog.title}
                className="h-32 w-32 md:h-40 md:w-40"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium">
                {blog.excerpt}
              </p>
              <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </div>
            </div>

            {/* Tags / Category */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Kategori:</span>
                <Link
                  to={`/blog?category=${blog.category?.slug || 'all'}`}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-colors"
                >
                  {blog.category?.name || blog.category}
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-8">Artikel Terkait</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedBlogs.map((post) => (
                    <RelatedBlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Ingin Belajar Lebih Banyak?</h2>
            <p className="text-muted-foreground mb-8">
              Jelajahi artikel lainnya seputar hosting, deployment, dan teknologi web modern.
            </p>
            <Button size="lg" className="rounded-full px-8" onClick={() => navigate('/blog')}>
              Lihat Semua Artikel
              <HugeiconsIcon icon={ArrowRight01Icon} size={18} className="ml-2" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
