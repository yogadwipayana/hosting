
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { ProductsSidebar } from "@/components/ProductsSidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  Database01Icon,
  CheckmarkCircle02Icon,
  ArrowRight01Icon
} from "@hugeicons/core-free-icons"

// Product categories for sidebar


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


// Database Card Component
function DatabaseCard({ name, logo, description, features, href }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
          <img src={logo} alt={name} className="h-8 w-8" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <ul className="space-y-2 mb-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} className="text-green-500 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <a href={href} target="_blank" rel="noopener noreferrer" className="block w-full">
        <Button className="w-full bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 hover:text-gray-900 shadow-sm">
          Lihat Detail
          <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-2" />
        </Button>
      </a>
    </div>
  )
}

// Pricing Card Component
function PricingCard({ title, price, period, features, highlighted, ctaText }) {
  return (
    <div className={`feature-card flex flex-col h-full rounded-2xl border p-6 ${highlighted ? "border-blue-500 bg-blue-50/50 ring-2 ring-blue-500" : "border-gray-200 bg-white"}`}>
      {highlighted && (
        <span className="inline-block w-fit px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full mb-4">
          Paling Populer
        </span>
      )}
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold text-foreground">{price}</span>
        <span className="text-muted-foreground">/{period}</span>
      </div>
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} className="text-green-500 mt-0.5 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full h-11 mt-auto bg-blue-600 hover:bg-blue-700">
        {ctaText || "Mulai Sekarang"}
        <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-2" />
      </Button>
    </div>
  )
}

// Main Page Component
export default function ManagedDatabasePage() {
  return (
    <>
      <Helmet>
        <title>Managed Database - BelajarHosting</title>
        <meta name="description" content="PostgreSQL & MySQL managed solutions dengan backup otomatis, scaling mudah, dan performa tinggi." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-white pt-8 pb-16">
        <div className="container mx-auto px-4">
          
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Produk", href: "/produk" },
              { label: "Managed Database", href: null },
            ]}
          />

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <ProductsSidebar />

            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              <div className="mb-8">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 mb-4">
                  <HugeiconsIcon icon={Database01Icon} size={28} color="#2563eb" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
                  Managed Database
                </h1>
                <p className="text-lg text-muted-foreground">
                  PostgreSQL & MySQL managed solutions dengan backup otomatis, scaling mudah, 
                  dan performa tinggi untuk aplikasi production-ready.
                </p>
              </div>

              {/* Supported Databases */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
                  Database yang Didukung
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DatabaseCard 
                    name="PostgreSQL"
                    logo="/images/postgres.svg"
                    description="Database relasional open-source yang powerful"
                    href="https://www.postgresql.org/"
                    features={[
                      "ACID compliant",
                      "JSON & JSONB support",
                      "Full-text search",
                      "Extensions support"
                    ]}
                  />
                  <DatabaseCard 
                    name="MySQL"
                    logo="/images/mysql.svg"
                    description="Database populer untuk web applications"
                    href="https://www.mysql.com/"
                    features={[
                      "High performance",
                      "Replication support",
                      "InnoDB engine",
                      "Community ecosystem"
                    ]}
                  />
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {[
                  "Backup otomatis setiap 6 jam",
                  "Point-in-time recovery",
                  "Enkripsi data at rest & in transit",
                  "Private networking",
                  "Monitoring & query analytics",
                  "Automatic failover",
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
                  Pilih Paket Database
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <PricingCard 
                    title="Basic"
                    price="Rp 15.000"
                    period="bulan"
                    features={[
                      "0.5 vCPU",
                      "0.5 GB RAM",
                      "5 GB Storage",
                      "Unlimited Database",
                      "Daily Backup",
                    ]}
                  />
                  <PricingCard 
                    title="Standard"
                    price="Rp 30.000"
                    period="bulan"
                    highlighted={true}
                    features={[
                      "1 vCPU",
                      "1 GB RAM",
                      "15 GB Storage",
                      "Unlimited Database",
                      "6-hour Backup",
                    ]}
                  />
                </div>
              </div>

              {/* Additional Info */}
              <div className="prose prose-gray max-w-none text-muted-foreground">
                <h2 className="text-xl font-semibold text-foreground mb-4">Mengapa Managed Database?</h2>
                <p className="mb-4">
                  Mengelola database sendiri membutuhkan keahlian khusus dan waktu yang signifikan. 
                  Dengan managed database, Anda mendapatkan performa optimal tanpa kompleksitas administrasi.
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li><strong>High Availability:</strong> Uptime 99.99% dengan automatic failover.</li>
                  <li><strong>Security:</strong> Patch keamanan diterapkan secara otomatis.</li>
                  <li><strong>Scalability:</strong> Upgrade resources tanpa downtime.</li>
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
