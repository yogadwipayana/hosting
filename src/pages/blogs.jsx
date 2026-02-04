import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, Calendar01Icon, UserIcon, Tag01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { Input } from "@/components/ui/input"
import { useState } from "react"

// Dummy Blog Data
const blogPosts = [
  {
    id: 1,
    title: "Cara Deploy Node.js App ke VPS Menggunakan Coolify",
    excerpt: "Panduan langkah demi langkah untuk men-deploy aplikasi Node.js Anda ke VPS sendiri menggunakan Coolify sebagai alternatif Heroku / Netlify yang lebih hemat.",
    image: "/images/coolify.svg",
    date: "4 Feb 2026",
    author: "Admin",
    category: "Tutorial",
    readTime: "5 min read",
    slug: "deploy-nodejs-coolify"
  },
  {
    id: 2,
    title: "Mengamankan Database PostgreSQL di Docker",
    excerpt: "Tips keamanan terbaik untuk menjalankan PostgreSQL di dalam container Docker. Mulai dari manajemen user, network isolation, hingga backup strategy.",
    image: "/images/database-svgrepo-com.svg",
    date: "2 Feb 2026",
    author: "Yoga",
    category: "Database",
    readTime: "7 min read",
    slug: "secure-postgres-docker"
  },
  {
    id: 3,
    title: "Otomatisasi Laporan Mingguan dengan n8n",
    excerpt: "Hemat waktu Anda dengan mengotomatisasi pembuatan laporan mingguan menggunakan n8n. Integrasi Google Sheets, Database, dan Slack dalam satu workflow.",
    image: "/images/n8n.svg",
    date: "28 Jan 2026",
    author: "Admin",
    category: "Automation",
    readTime: "10 min read",
    slug: "automation-n8n-reports"
  },
  {
    id: 4,
    title: "Memilih Provider VPS Terbaik untuk Pemula",
    excerpt: "Bingung memilih antara DigitalOcean, Vultr, atau Linode? Simak perbandingan lengkap harga, performa, dan kemudahan penggunaan untuk pemula.",
    image: "/images/website-svgrepo-com.svg",
    date: "25 Jan 2026",
    author: "Yoga",
    category: "Hosting",
    readTime: "6 min read",
    slug: "best-vps-beginners"
  },
  {
    id: 5,
    title: "Monitoring Server dengan Uptime Kuma",
    excerpt: "Jangan biarkan website Anda down tanpa sepengetahuan. Pasang Uptime Kuma untuk monitoring status server dan website secara real-time.",
    image: "/images/devops-svgrepo-com.svg",
    date: "20 Jan 2026",
    author: "Admin",
    category: "DevOps",
    readTime: "4 min read",
    slug: "monitoring-uptime-kuma"
  },
  {
    id: 6,
    title: "Migrasi dari MySQL ke PostgreSQL",
    excerpt: "Alasan mengapa banyak developer beralih ke PostgreSQL dan panduan praktis untuk melakukan migrasi database tanpa downtime yang lama.",
    image: "/images/database-svgrepo-com.svg", // Reusing database icon
    date: "15 Jan 2026",
    author: "Yoga",
    category: "Database",
    readTime: "8 min read",
    slug: "migrate-mysql-postgres"
  }
]

// Hero Section
function BlogHero() {
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
             className="pl-10 h-12 bg-white shadow-sm border-gray-200 focus:border-primary focus:ring-primary w-full rounded-xl"
           />
        </div>
      </div>
    </section>
  )
}

// Blog Card Component
function BlogCard({ post }) {
  return (
    <Card className="group cursor-pointer border-0 shadow-sm hover:shadow-lg transition-all h-full flex flex-col overflow-hidden bg-white">
      <div className="relative h-48 bg-gray-100 flex items-center justify-center p-6 group-hover:bg-gray-50 transition-colors">
        <img src={post.image} alt={post.title} className="h-20 w-20 group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary shadow-sm">
          {post.category}
        </div>
      </div>
      
      <CardContent className="flex-1 flex flex-col p-6">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
             <HugeiconsIcon icon={Calendar01Icon} size={14} />
             <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
             <HugeiconsIcon icon={UserIcon} size={14} />
             <span>{post.author}</span>
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
  )
}

// Main Blog Page
export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const categories = ["All", "Tutorial", "Database", "Automation", "Hosting", "DevOps"]

  const filteredPosts = activeCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory)

  return (
    <>
      <Helmet>
        <title>Blog - BelajarHosting</title>
        <meta name="description" content="Kumpulan artikel dan tutorial seputar hosting, deployment, server, dan teknologi web modern." />
      </Helmet>
      
      <Navbar />

      <main className="min-h-screen bg-white">
        <BlogHero />
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Load More (Static for now) */}
            <div className="text-center mt-12">
               <Button variant="outline" size="lg" className="rounded-full px-8">
                 Muat Lebih Banyak
               </Button>
            </div>

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
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input type="email" placeholder="Email Anda" className="bg-white h-12" />
              <Button size="lg" className="h-12 bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
