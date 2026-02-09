
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { ProductsSidebar } from "@/components/ProductsSidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  CheckmarkCircle02Icon,
  ArrowRight01Icon,
  ComputerIcon
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


// Pricing Card Component
function PricingCard({ title, price, period, features, highlighted, ctaText, href }) {
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
      <Link to={href || "/dashboard/vps/deploy"}>
        <Button className="w-full h-11 mt-auto bg-blue-600 hover:bg-blue-700">
          {ctaText || "Mulai Sekarang"}
          <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-2" />
        </Button>
      </Link>
    </div>
  )
}

// Main Page Component
export default function VpsPage() {
  return (
    <>
      <Helmet>
        <title>VPS - BelajarHosting</title>
        <meta name="description" content="Virtual Private Server dengan performa tinggi dan full root access. Deploy server dalam hitungan menit." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-white pt-8 pb-16">
        <div className="container mx-auto px-4">
          
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Produk", href: "/produk" },
              { label: "VPS", href: null },
            ]}
          />

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <ProductsSidebar />

            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              <div className="mb-8">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 mb-4">
                  <HugeiconsIcon icon={ComputerIcon} size={28} color="#2563eb" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
                  Virtual Private Server (VPS)
                </h1>
                <p className="text-lg text-muted-foreground">
                  Server virtual dengan performa tinggi dan full root access. 
                  Deploy server dalam hitungan menit dengan infrastruktur enterprise-grade.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {[
                  "Full Root Access",
                  "SSD NVMe Storage",
                  "Dedicated Resources",
                  "Multiple OS Options",
                  "Instant Deployment",
                  "24/7 Monitoring",
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
                  Pilih Paket VPS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PricingCard 
                    title="KVM 1"
                    price="Rp 40.000"
                    period="bulan"
                    features={[
                      "1 vCPU",
                      "1 GB RAM",
                      "15 GB NVMe SSD",
                      "1 TB Bandwidth",
                      "1GB/s Internet Speed",
                      "1 IPv4 Address",
                      "Full Root Access",
                    ]}
                  />
                  <PricingCard 
                    title="KVM 2"
                    price="Rp 75.000"
                    period="bulan"
                    highlighted={true}
                    features={[
                      "1 vCPU",
                      "2 GB RAM",
                      "25 GB NVMe SSD",
                      "1 TB Bandwidth",
                      "1GB/s Internet Speed",
                      "1 IPv4 Address",
                      "Full Root Access",
                    ]}
                  />
                </div>
              </div>

              {/* OS Options */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
                  Sistem Operasi yang Didukung
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "Ubuntu", versions: "20.04, 22.04, 24.04" },
                    { name: "Debian", versions: "11, 12" },
                    { name: "CentOS", versions: "8, 9 Stream" },
                    { name: "Rocky Linux", versions: "8, 9" },
                  ].map((os, index) => (
                    <div key={index} className="p-4 rounded-xl border border-gray-200 bg-white text-center">
                      <h4 className="font-semibold text-foreground mb-1">{os.name}</h4>
                      <p className="text-xs text-muted-foreground">{os.versions}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ / Additional Info */}
              <div className="prose prose-gray max-w-none text-muted-foreground">
                <h2 className="text-xl font-semibold text-foreground mb-4">Mengapa Memilih VPS?</h2>
                <p className="mb-4">
                  VPS memberikan Anda kontrol penuh atas server virtual dengan resources yang dedicated.
                  Ideal untuk aplikasi yang membutuhkan custom configuration atau high-performance computing.
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li><strong>Isolated Resources:</strong> CPU, RAM, dan storage tidak dibagi dengan pengguna lain.</li>
                  <li><strong>Full Control:</strong> Root access untuk instalasi software apapun.</li>
                  <li><strong>Scalability:</strong> Upgrade resources kapan saja tanpa migrasi.</li>
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
