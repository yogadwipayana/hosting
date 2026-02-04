import { useState } from "react"
import { Link, useLocation } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  ArrowRight01Icon, 
  GlobeIcon, 
  LockPasswordIcon, 
  QrCodeIcon, 
  ColorsIcon, 
  Clock01Icon, 
  Search01Icon,
  CheckmarkCircle02Icon,
  AlertCircleIcon,
  Loading01Icon,
  ArrowRightIcon
} from "@hugeicons/core-free-icons"

// Tool data similar to tools.jsx but grouped for sidebar
const toolCategories = [
  {
    title: "Server & Hosting",
    count: 10,
    items: [
      { id: "uptime-checker", title: "Website Uptime Checker", href: "/alat/uptime-checker", icon: GlobeIcon, active: true },
    ]
  },
  {
    title: "Security & Encryption",
    count: 3,
    items: [
      { id: "password-generator", title: "Password Generator", href: "/alat/password-generator", icon: LockPasswordIcon },
    ]
  },
  {
    title: "Data Encoding & Formatting",
    count: 3,
    items: [
      { id: "color-converter", title: "Color Converter", href: "/alat/color-converter", icon: ColorsIcon },
      { id: "unix-timestamp", title: "Unix Timestamp", href: "/alat/unix-timestamp", icon: Clock01Icon },
    ]
  },
  {
    title: "Developer Utilities",
    count: 8,
    items: [
      { id: "qr-code", title: "QR Code", href: "/alat/qr-code", icon: QrCodeIcon },
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
function ToolsSidebar() {
  return (
    <div className="w-full lg:w-72 flex-shrink-0 space-y-6">
      {/* Search Tools */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <HugeiconsIcon icon={Search01Icon} size={16} className="text-muted-foreground" />
        </div>
        <Input 
          type="text" 
          placeholder="Cari tools..." 
          className="pl-9 h-10 bg-white"
        />
      </div>

      {/* Categories */}
      <div className="space-y-1">
        <Accordion type="multiple" defaultValue={["Server & Hosting", "Security & Encryption", "Data Encoding & Formatting", "Developer Utilities"]} className="w-full">
          {toolCategories.map((category) => (
            <AccordionItem key={category.title} value={category.title} className="border-none">
              <AccordionTrigger className="py-2 hover:no-underline text-sm font-medium text-muted-foreground hover:text-foreground">
                {category.title} ({category.count})
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1 pb-2">
                  {category.items.map((item) => (
                    <Link
                      key={item.id}
                      to={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        item.active 
                          ? "bg-amber-100 text-amber-700 font-medium" 
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

// Uptime Check Form Component
function UptimeCheckForm() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleCheck = () => {
    if (!url) return
    
    setLoading(true)
    setError(null)
    setResult(null)

    // Simulate check
    setTimeout(() => {
      setLoading(false)
      // Mock result
      setResult({
        status: "Online",
        code: 200,
        time: "145ms",
        ip: "104.21.55.2"
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="url" className="text-base font-medium">Website URL</Label>
          <div className="flex gap-2">
            <Input 
              id="url" 
              placeholder="https://example.com" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-12 text-base bg-white"
            />
            <Button 
              onClick={handleCheck} 
              disabled={loading || !url}
              className="h-12 px-6 bg-slate-900 text-white hover:bg-slate-800"
            >
              {loading ? (
                <>
                  <HugeiconsIcon icon={Loading01Icon} className="animate-spin mr-2" />
                  Checking...
                </>
              ) : (
                "Check Uptime"
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Masukkan URL lengkap termasuk http:// atau https://
          </p>
        </div>
        
        {/* Results */}
        {result && (
          <div className="rounded-xl border bg-white p-6 animate-in fade-in slide-in-from-top-2">
             <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                   <HugeiconsIcon icon={CheckmarkCircle02Icon} size={24} />
                </div>
                <div>
                   <h3 className="font-semibold text-lg text-green-600">Website is Online</h3>
                   <p className="text-sm text-muted-foreground">Checked just now</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-gray-50 border">
                   <div className="text-sm text-muted-foreground mb-1">Response Time</div>
                   <div className="text-xl font-bold">{result.time}</div>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 border">
                   <div className="text-sm text-muted-foreground mb-1">Status Code</div>
                   <div className="text-xl font-bold">{result.code} OK</div>
                </div>
                 <div className="p-4 rounded-lg bg-gray-50 border">
                   <div className="text-sm text-muted-foreground mb-1">IP Address</div>
                   <div className="text-xl font-bold">{result.ip}</div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Main Page Component
export default function UptimeCheckerPage() {
  return (
    <>
      <Helmet>
        <title>Website Uptime Checker - BelajarHosting Tools</title>
        <meta name="description" content="Cek status website anda secara real-time. Verifikasi apakah server online atau down dengan tool gratis ini." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-white pt-8 pb-16">
        <div className="container mx-auto px-4">
          
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Alat", href: "/alat" },
              { label: "Website Uptime Checker", href: null },
            ]}
          />

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <ToolsSidebar />

            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
                  Website Uptime Checker
                </h1>
                <p className="text-lg text-muted-foreground">
                  Cek ketersediaan website Anda dari berbagai lokasi di seluruh dunia. 
                  Pastikan website Anda selalu dapat diakses oleh pengunjung.
                </p>
              </div>

              <div className="p-6 md:p-8 rounded-2xl border border-gray-200 bg-white shadow-sm mb-12">
                 <UptimeCheckForm />
              </div>

              {/* Additional Information / SEO Content */}
              <div className="prose prose-gray max-w-none text-muted-foreground">
                <h2 className="text-xl font-semibold text-foreground mb-4">Apa itu Uptime Checker?</h2>
                <p className="mb-4">
                  Uptime Checker adalah alat diagnosa jaringan yang memverifikasi apakah sebuah website atau server dapat diakses melalui internet. 
                  Alat ini mengirimkan permintaan HTTP/HTTPS ke URL target dan menganalisis kode status respons yang diterima.
                </p>
                <h2 className="text-xl font-semibold text-foreground mb-4">Mengapa Uptime Penting?</h2>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li><strong>SEO Ranking:</strong> Search engine seperti Google memprioritaskan website yang selalu aktif dan cepat.</li>
                  <li><strong>User Experience:</strong> Pengunjung akan meninggalkan website yang tidak bisa diakses, meningkatkan bounce rate.</li>
                  <li><strong>Reputasi Bisnis:</strong> Downtime yang sering dapat merusak kredibilitas bisnis Anda di mata pelanggan.</li>
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
