import { useState } from "react"
import { Link, useLocation } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ToolsSidebar } from "@/components/ToolsSidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CheckmarkCircle02Icon,
  AlertCircleIcon,
  Loading01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons"
import { toolsApi } from "@/lib/api.js"



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



// Uptime Check Form Component
function UptimeCheckForm() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleCheck = async () => {
    if (!url) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await toolsApi.checkUptime(url)
      setResult(response.data)
    } catch (err) {
      setError(err.message || 'Failed to check uptime')
    } finally {
      setLoading(false)
    }
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
        
        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <HugeiconsIcon icon={Cancel01Icon} size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-red-600">Error</h3>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="rounded-xl border bg-white p-6 animate-in fade-in slide-in-from-top-2">
             <div className="flex items-center gap-3 mb-6">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  result.status === 'Online'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}>
                   <HugeiconsIcon icon={result.status === 'Online' ? CheckmarkCircle02Icon : AlertCircleIcon} size={24} />
                </div>
                <div>
                   <h3 className={`font-semibold text-lg ${
                     result.status === 'Online' ? 'text-green-600' : 'text-red-600'
                   }`}>
                     {result.status === 'Online' ? 'Website is Online' : 'Website is Offline'}
                   </h3>
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
                   <div className="text-xl font-bold">{result.code} {result.statusText}</div>
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
            <ToolsSidebar activeToolId="uptime-checker" />

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
