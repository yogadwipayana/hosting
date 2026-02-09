
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { ProductsSidebar } from "@/components/ProductsSidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  GlobeIcon, 
  Database01Icon, 
  Clock01Icon, 
  CheckmarkCircle02Icon,
  ArrowRight01Icon,
  Link01Icon
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


// Integration Card Component
function IntegrationCard({ name, description, icon }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow">
      <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
        <HugeiconsIcon icon={icon} size={24} color="#2563eb" />
      </div>
      <div>
        <h4 className="font-semibold text-foreground">{name}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

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
      <Button 
        asChild={!!href}
        className="w-full h-11 mt-auto bg-blue-600 hover:bg-blue-700"
      >
        {href ? (
          href.startsWith("http") ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {ctaText || "Mulai Sekarang"}
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-2" />
            </a>
          ) : (
             <Link to={href}>
              {ctaText || "Mulai Sekarang"}
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-2" />
             </Link>
          )
        ) : (
          <>
            {ctaText || "Mulai Sekarang"}
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-2" />
          </>
        )}
      </Button>
    </div>
  )
}

// Main Page Component
export default function N8nAutomationPage() {
  return (
    <>
      <Helmet>
        <title>n8n Automation - BelajarHosting</title>
        <meta name="description" content="Workflow automation made simple. Integrasikan berbagai layanan dan API tanpa coding yang rumit dengan n8n." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-white pt-8 pb-16">
        <div className="container mx-auto px-4">
          
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Produk", href: "/produk" },
              { label: "n8n Automation", href: null },
            ]}
          />

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <ProductsSidebar />

            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              <div className="mb-8">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 mb-4">
                  <HugeiconsIcon icon={Clock01Icon} size={28} color="#2563eb" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
                  n8n Automation
                </h1>
                <p className="text-lg text-muted-foreground">
                  Workflow automation made simple. Integrasikan berbagai layanan dan API 
                  tanpa coding yang rumit. Otomatisasi tugas-tugas repetitif dengan mudah.
                </p>
              </div>

              {/* What is n8n */}
              <div className="rounded-2xl bg-linear-to-br from-blue-50 to-indigo-50 p-8 mb-12 border border-blue-100">
                <h2 className="text-2xl font-bold text-foreground mb-4">Apa itu n8n?</h2>
                <p className="text-muted-foreground mb-6">
                  n8n adalah platform workflow automation open-source yang memungkinkan Anda 
                  menghubungkan berbagai aplikasi dan layanan. Dengan interface visual drag-and-drop, 
                  Anda dapat membuat automation tanpa perlu menulis kode.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 rounded-full bg-white text-sm text-blue-700 border border-blue-200">
                    400+ Integrations
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white text-sm text-blue-700 border border-blue-200">
                    Visual Editor
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white text-sm text-blue-700 border border-blue-200">
                    Self-hosted
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white text-sm text-blue-700 border border-blue-200">
                    Open Source
                  </span>
                </div>
              </div>

              {/* Popular Integrations */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
                  Integrasi Populer
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <IntegrationCard 
                    name="Google Sheets"
                    description="Sync data ke spreadsheet"
                    icon={GlobeIcon}
                  />
                  <IntegrationCard 
                    name="Slack"
                    description="Kirim notifikasi otomatis"
                    icon={Link01Icon}
                  />
                  <IntegrationCard 
                    name="PostgreSQL"
                    description="Query dan update database"
                    icon={Database01Icon}
                  />
                  <IntegrationCard 
                    name="Webhook"
                    description="Terima data dari external sources"
                    icon={Link01Icon}
                  />
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {[
                  "Visual workflow builder",
                  "400+ pre-built integrations",
                  "Custom JavaScript nodes",
                  "Error handling & retry",
                  "Scheduled executions",
                  "Version control",
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
                  Pilih Paket n8n
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <PricingCard 
                    title="Starter"
                    price="Rp 30.000"
                    period="bulan"
                    features={[
                      "1 vCPU",
                      "1 GB RAM",
                      "15 GB Storage",
                      "Unlimited Executions",
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
                      "25 GB Storage",
                      "Unlimited Executions",
                    ]}
                  />
                  <PricingCard 
                    title="Enterprise"
                    price="Custom"
                    period="bulan"
                    features={[
                      "Unlimited Executions",
                      "Dedicated instance",
                      "SSO & RBAC",
                      "Dedicated support",
                    ]}
                    ctaText="Hubungi Sales"
                    href="https://wa.me/6285173090538"
                  />
                </div>
              </div>

              {/* Use Cases */}
              <div className="prose prose-gray max-w-none text-muted-foreground">
                <h2 className="text-xl font-semibold text-foreground mb-4">Contoh Use Case</h2>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li><strong>Lead Nurturing:</strong> Otomatis kirim email follow-up berdasarkan behavior user.</li>
                  <li><strong>Data Sync:</strong> Sinkronisasi data antara CRM, database, dan spreadsheet.</li>
                  <li><strong>Monitoring:</strong> Alert ke Slack ketika ada error di aplikasi.</li>
                  <li><strong>Content Publishing:</strong> Auto-post ke social media dari RSS feed.</li>
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
