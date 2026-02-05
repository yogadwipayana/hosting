import { useState } from "react"
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import DomainPrice from "@/components/DomainPrice"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  GlobeIcon, 
  Database01Icon, 
  Clock01Icon, 
  Search01Icon,
  CheckmarkCircle02Icon,
  ArrowRight01Icon
} from "@hugeicons/core-free-icons"

// Product categories for sidebar
const productCategories = [
  {
    title: "Hosting",
    items: [
      { id: "cloud", title: "Managed Hosting", href: "/produk/cloud", icon: GlobeIcon, active: true },
    ]
  },
  {
    title: "Managed Services",
    items: [
      { id: "database", title: "Managed Database", href: "/produk/database", icon: Database01Icon },
    ]
  },
  {
    title: "Automation",
    items: [
      { id: "n8n", title: "n8n Automation", href: "/produk/n8n", icon: Clock01Icon },
    ]
  }
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

// Sidebar Component
function ProductsSidebar() {
  return (
    <div className="w-full lg:w-72 shrink-0 space-y-6">
      {/* Search Products */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <HugeiconsIcon icon={Search01Icon} size={16} className="text-muted-foreground" />
        </div>
        <Input 
          type="text" 
          placeholder="Cari produk..." 
          className="pl-9 h-10 bg-white"
        />
      </div>

      {/* Categories */}
      <div className="space-y-1">
        <Accordion type="multiple" defaultValue={["Hosting", "Managed Services", "Automation"]} className="w-full">
          {productCategories.map((category) => (
            <AccordionItem key={category.title} value={category.title} className="border-none">
              <AccordionTrigger className="py-2 hover:no-underline text-sm font-medium text-muted-foreground hover:text-foreground">
                {category.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1 pb-2">
                  {category.items.map((item) => (
                    <Link
                      key={item.id}
                      to={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        item.active 
                          ? "bg-blue-100 text-blue-700 font-medium" 
                          : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
                      }`}
                    >
                      <HugeiconsIcon icon={item.icon} size={16} />
                      {item.title}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

// Pricing Card Component
function PricingCard({ title, price, period, features, highlighted, ctaText }) {
  return (
    <div className={`rounded-2xl border p-6 ${highlighted ? "border-blue-500 bg-blue-50/50 ring-2 ring-blue-500" : "border-gray-200 bg-white"}`}>
      {highlighted && (
        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full mb-4">
          Paling Populer
        </span>
      )}
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold text-foreground">{price}</span>
        <span className="text-muted-foreground">/{period}</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} className="text-green-500 mt-0.5 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className={`w-full h-11 ${highlighted ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-900 hover:bg-slate-800"}`}>
        {ctaText || "Mulai Sekarang"}
        <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-2" />
      </Button>
    </div>
  )
}

// Main Page Component
export default function ManagedHostingPage() {
  return (
    <>
      <Helmet>
        <title>Managed Hosting - BelajarHosting</title>
        <meta name="description" content="Scalable managed hosting solution untuk aplikasi high-performance. Deploy dalam hitungan menit dengan infrastruktur yang reliable." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-white pt-8 pb-16">
        <div className="container mx-auto px-4">
          
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Produk", href: "/produk" },
              { label: "Managed Hosting", href: null },
            ]}
          />

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <ProductsSidebar />

            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              <div className="mb-8">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 mb-4">
                  <HugeiconsIcon icon={GlobeIcon} size={28} color="#2563eb" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
                  Managed Hosting
                </h1>
                <p className="text-lg text-muted-foreground">
                  Scalable managed hosting solution untuk aplikasi high-performance. 
                  Deploy dalam hitungan menit dengan infrastruktur yang reliable dan secure.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {[
                  "Deploy otomatis dari Git repository",
                  "SSL/TLS certificates gratis",
                  "Auto-scaling berdasarkan traffic",
                  "Monitoring & alerting 24/7",
                  "Backup harian otomatis",
                  "Support prioritas via chat",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 border">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} className="text-green-500 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
                  Pilih Paket yang Tepat
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <PricingCard 
                    title="Starter"
                    price="Rp 30.000"
                    period="bulan"
                    features={[
                      "1 vCPU",
                      "1 GB RAM",
                      "15 GB SSD Storage",
                      "1 TB Bandwidth",
                      "1 Sub Domain *.belajarhosting.com",
                    ]}
                  />
                  <PricingCard 
                    title="Pro"
                    price="Rp 50.000"
                    period="bulan"
                    highlighted={true}
                    features={[
                      "1 vCPU",
                      "2 GB RAM",
                      "25 GB SSD Storage",
                      "1 TB Bandwidth",
                      "3 Sub Domain *.belajarhosting.com",
                      "Staging Environment",
                    ]}
                  />
                  <PricingCard 
                    title="Business"
                    price="Rp 100.000"
                    period="bulan"
                    features={[
                      "2 vCPU",
                      "4 GB RAM",
                      "50 GB SSD Storage",
                      "2 TB Bandwidth",
                      "Gratis Domain .com/.id/.org (min. pembelian 12 bulan)",
                    ]}
                  />
                </div>
              </div>


              {/* Add on Domain */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
                  Add on Domain
                </h2>
                <DomainPrice />
              </div>

              {/* FAQ / Additional Info */}
              <div className="prose prose-gray max-w-none text-muted-foreground">
                <h2 className="text-xl font-semibold text-foreground mb-4">Mengapa Memilih Managed Hosting?</h2>
                <p className="mb-4">
                  Dengan managed hosting, Anda tidak perlu khawatir tentang maintenance server, security patches, 
                  atau optimasi performa. Tim kami menangani semua aspek teknis sehingga Anda dapat fokus 
                  pada pengembangan aplikasi.
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li><strong>Zero Downtime Deployment:</strong> Update aplikasi tanpa mengganggu user.</li>
                  <li><strong>Global CDN:</strong> Konten dikirim dari edge server terdekat.</li>
                  <li><strong>DDoS Protection:</strong> Perlindungan otomatis dari serangan.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
