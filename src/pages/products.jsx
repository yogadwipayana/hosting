import { useState } from "react"
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, Search01Icon } from "@hugeicons/core-free-icons"

// Product data matching Navbar.jsx menuData.produk
const productList = [
  {
    id: "managed-hosting",
    title: "Managed Hosting",
    description: "Scalable managed hosting solution untuk aplikasi high-performance. Deploy dalam hitungan menit.",
    image: "/images/coolify.svg",
    href: "/produk/cloud",
    category: "Hosting",
    color: "bg-blue-100",
  },
  {
    id: "managed-database",
    title: "Managed Database",
    description: "PostgreSQL & MySQL managed solutions dengan backup otomatis, scaling mudah, dan performa tinggi.",
    image: "/images/database-svgrepo-com.svg",
    href: "/produk/database",
    category: "Managed Services",
    color: "bg-blue-100",
  },
  {
    id: "n8n-automation",
    title: "n8n Automation",
    description: "Workflow automation made simple. Integrasikan berbagai layanan dan API tanpa coding yang rumit.",
    image: "/images/n8n.svg",
    href: "/produk/n8n",
    category: "Automation",
    color: "bg-blue-100",
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

// Products Hero Section
function ProductsHero() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Produk", href: null },
            ]}
          />

          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-4">
            Produk & Layanan Cloud
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            Solusi cloud infrastructure yang reliable, scalable, dan secure
            untuk mendukung pertumbuhan bisnis digital Anda.
          </p>

          {/* Search Bar */}
          <div className="relative flex items-center max-w-2xl">
            <div className="absolute left-4 flex items-center pointer-events-none">
              <HugeiconsIcon icon={Search01Icon} size={20} className="text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Cari produk (e.g. database, hosting, n8n)..."
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

// Product Card Component
function ProductCard({ product }) {
  return (
    <Card className="group cursor-pointer border-0 shadow-sm hover:shadow-md transition-all h-full">
      <CardHeader className="pb-3">
        <div
          className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${product.color} mb-4`}
        >
          <img src={product.image} alt={product.title} className="h-7 w-7" />
        </div>
        <CardTitle className="text-lg">{product.title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Link
          to={product.href}
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          Lihat Detail
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

// Products Grid Section
function ProductsGridSection() {
  const categories = ["Hosting", "Managed Services", "Automation"]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              Semua Produk
            </h2>
            <p className="text-muted-foreground">
              Jelajahi berbagai solusi cloud yang kami tawarkan.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// More Products CTA Section
function MoreProductsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-2xl bg-white border border-gray-200 p-8 lg:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
              Butuh Solusi Custom?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Kami siap membantu Anda merancang infrastruktur yang sesuai dengan kebutuhan spesifik bisnis Anda.
              Hubungi tim expert kami untuk konsultasi gratis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="rounded-lg bg-primary hover:bg-primary/90">
                Hubungi Sales
              </Button>
              <Button variant="outline" className="rounded-lg">
                Jadwalkan Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main Products Page
export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title>Produk & Layanan Cloud - BelajarHosting</title>
        <meta
          name="description"
          content="Koleksi produk dan layanan cloud hosting, managed database, dan automasi untuk bisnis Anda."
        />
      </Helmet>
      <Navbar />
      <main>
        <ProductsHero />
        <ProductsGridSection />
        <MoreProductsSection />
      </main>
      <Footer />
    </>
  )
}
