import { useState } from "react"
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, GlobeIcon, CheckmarkCircle02Icon, ColorsIcon, Search01Icon, BookOpen01Icon } from "@hugeicons/core-free-icons"

// Education data matching Navbar.jsx menuData.edukasi
const educationList = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Panduan pemula untuk memulai perjalanan Anda di dunia hosting dan deployment.",
    icon: ArrowRight01Icon,
    href: "/edukasi/getting-started",
    category: "Tutorial",
    color: "bg-blue-100",
    iconColor: "#2563eb",
  },
  {
    id: "deploy-website",
    title: "Deploy Website",
    description: "Tutorial langkah demi langkah cara deploy website statis dan dinamis ke berbagai platform.",
    icon: GlobeIcon,
    href: "/edukasi/deploy",
    category: "Tutorial",
    color: "bg-blue-100",
    iconColor: "#2563eb",
  },
  {
    id: "best-practices",
    title: "Best Practices",
    description: "Kumpulan tips, trik, dan standar industri untuk keamanan dan performa aplikasi.",
    icon: CheckmarkCircle02Icon, 
    href: "/edukasi/best-practices",
    category: "Tutorial",
    color: "bg-blue-100",
    iconColor: "#2563eb",
  },
  {
    id: "blog",
    title: "Blog",
    description: "Artikel terbaru seputar teknologi, tutorial singkat, dan update komunitas.",
    icon: ColorsIcon, 
    href: "/blog",
    category: "Resources",
    color: "bg-blue-100",
    iconColor: "#2563eb",
  },
  {
    id: "documentation",
    title: "Documentation",
    description: "Panduan teknis lengkap dan referensi API untuk penggunaan platform kami.",
    // Using Search01Icon as fallback for documentation/reference lookup if Book icon not available
    // But let's try to assume BookOpen01Icon might be available or fallback to Search01Icon which is definitely imported above
    icon: Search01Icon,
    href: "/docs",
    category: "Resources",
    color: "bg-blue-100",
    iconColor: "#2563eb",
  },
]

// Breadcrumb Component
function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-gray-400">/</span>}
          {item.href ? (
            <Link to={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

// Educations Hero Section
function EducationsHero() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Edukasi", href: null },
            ]}
          />

          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-4">
            Pusat Edukasi & Tutorial
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            Pelajari cara deploy, manage server, dan optimasi aplikasi Anda dengan panduan lengkap dari kami.
          </p>

          {/* Search Bar */}
          <div className="relative flex items-center max-w-2xl">
            <div className="absolute left-4 flex items-center pointer-events-none">
              <HugeiconsIcon icon={Search01Icon} size={20} className="text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Cari tutorial (e.g. deploy, docker, security)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-14 w-full rounded-xl border-gray-200 bg-white text-base shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Education Card Component
function EducationCard({ education }) {
  return (
    <Card className="group cursor-pointer border-0 shadow-sm hover:shadow-md transition-all h-full">
      <CardHeader className="pb-3">
        <div
          className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${education.color} mb-4`}
        >
          <HugeiconsIcon icon={education.icon} size={24} color={education.iconColor} />
        </div>
        <CardTitle className="text-lg">{education.title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {education.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Link
          to={education.href}
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          Baca Selengkapnya
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size={16}
            className="ml-1 transition-transform group-hover:translate-x-1"
          />
        </Link>
      </CardContent>
    </Card>
  )
}

// Educations Grid Section
function EducationsGridSection() {
  const categories = ["Tutorial", "Resources"]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              Materi Pembelajaran
            </h2>
            <p className="text-muted-foreground">
              Temukan panduan yang sesuai dengan kebutuhan belajar Anda.
            </p>
          </div>

          {/* Educations Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {educationList.map((item) => (
              <EducationCard key={item.id} education={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Newsletter CTA Section
function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle") // idle, loading, success, error
  const [message, setMessage] = useState("")

  const handleSubscribe = (e) => {
    e.preventDefault()
    
    // Reset status
    setStatus("loading")
    setMessage("")

    // Basic Validation
    if (!email) {
      setStatus("error")
      setMessage("Email tidak boleh kosong.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus("error")
      setMessage("Format email tidak valid.")
      return
    }

    // Simulate API Call
    setTimeout(() => {
      setStatus("success")
      setMessage("Terima kasih! Anda telah berhasil berlangganan.")
      setEmail("")
      
      // Reset to idle after 3 seconds so user can subscribe another email if they want
      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 5000)
    }, 1500)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-2xl bg-white border border-gray-200 p-8 lg:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
              Dapatkan Tutorial Terbaru
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Berlangganan newsletter kami untuk mendapatkan tips hosting, security, dan deployment langsung di inbox Anda.
            </p>
            
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-2">
                <div className="w-full relative">
                  <Input 
                    type="email" 
                    placeholder="Masukkan alamat email anda" 
                    className={`h-10 bg-white ${status === 'error' ? 'border-red-500 focus-visible:ring-red-500' : ''} ${status === 'success' ? 'border-green-500 focus-visible:ring-green-500' : ''}`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (status === 'error') {
                        setStatus('idle')
                        setMessage('')
                      }
                    }}
                    disabled={status === 'loading' || status === 'success'}
                  />
                </div>
                <Button 
                  type="submit" 
                  className={`rounded-lg whitespace-nowrap transition-all ${
                    status === 'success' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                  disabled={status === 'loading' || status === 'success'}
                >
                  {status === 'loading' ? 'Memproses...' : status === 'success' ? 'Terkirim!' : 'Subscribe'}
                </Button>
              </div>
              
              {/* Validation & Success Messages */}
              <div className="h-6">
                {status === 'error' && (
                  <p className="text-sm text-red-500 animate-in fade-in slide-in-from-top-1">
                    {message}
                  </p>
                )}
                {status === 'success' && (
                  <p className="text-sm text-green-600 font-medium animate-in fade-in slide-in-from-top-1">
                    {message}
                  </p>
                )}
              </div>
            </form>

            <p className="text-xs text-muted-foreground mt-2">
              Kami tidak akan mengirimkan spam. Unsubscribe kapan saja.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main Educations Page
export default function EducationsPage() {
  return (
    <>
      <Helmet>
        <title>Pusat Edukasi & Tutorial - BelajarHosting</title>
        <meta
          name="description"
          content="Pelajari cara deploy website, managed database, dan optimasi server. Panduan lengkap dan tutorial gratis."
        />
      </Helmet>
      <Navbar />
      <main>
        <EducationsHero />
        <EducationsGridSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  )
}
