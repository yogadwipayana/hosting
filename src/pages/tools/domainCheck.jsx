import { useState } from "react"
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ToolsSidebar } from "@/components/ToolsSidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import DomainPrice from "@/components/DomainPrice"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  Search01Icon, 
  CheckmarkCircle02Icon, 
  CancelCircleIcon, 
  GlobeIcon,
  Calendar03Icon,
  UserIcon
} from "@hugeicons/core-free-icons"
import { Loader2, Server, AlertCircle } from "lucide-react"

export default function DomainCheckPage() {
  const [domain, setDomain] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleCheck = async (e) => {
    e.preventDefault()
    if (!domain) return

    setLoading(true)
    setError(null)
    setResult(null)

    // Simulasi API Call - Menggunakan setTimeout
    // Nanti bisa diganti dengan real API call ke backend atau WHOIS service
    setTimeout(() => {
      setLoading(false)
      
      // Logic: Jika user input "nama" -> cek nama.com, nama.net, dll.
      // Jika user input "nama.com" -> cek nama.com saja (atau + saran lain).
      
      const cleanDomain = domain.toLowerCase().split('.')[0] // Ambil nama saja
      const tldsToCheck = [".com", ".net", ".org", ".id", ".co.id", ".web.id", ".or.id", ".ac.id"]
      
      // Generate hasil mock untuk setiap TLD
      const results = tldsToCheck.map(tld => {
        const fullDomain = `${cleanDomain}${tld}`
        // Simulasi: .com selalu taken (mock) agar ada variasi hasil seperti screenshot, sisanya random
        const isAvailable = tld === ".com" ? false : Math.random() > 0.3
        
        return {
          domain: fullDomain,
          available: isAvailable,
          whois: isAvailable ? null : {
              registrar: "GoDaddy.com, LLC", // Data dummy
          }
        }
      })
      
      setResult(results)
    }, 1500)
  }

  return (
    <>
      <Helmet>
        <title>Domain Checker & WHOIS - Alat Hosting</title>
        <meta name="description" content="Cek ketersediaan nama domain dan informasi WHOIS lengkap. Temukan domain impian Anda sekarang." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <ToolsSidebar activeToolId="domain-checker" />
            
            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
                  Domain Checker
                </h1>
                <p className="text-lg text-muted-foreground">
                  Cek ketersediaan nama domain untuk brand atau bisnis Anda. 
                  Jika domain sudah terdaftar, lihat informasi WHOIS lengkapnya.
                </p>
              </div>

              {/* Check Card */}
              <Card className="mb-8 border-gray-200 shadow-sm">
                <CardContent className="pt-6">
                  <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <HugeiconsIcon icon={GlobeIcon} size={20} />
                      </div>
                      <Input
                        type="text"
                        placeholder="Masukkan nama domain (contoh: mybrand.com)"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="pl-10 h-12 text-base"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={loading || !domain}
                      className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Checking...
                        </>
                      ) : (
                        <>
                          <HugeiconsIcon icon={Search01Icon} size={18} className="mr-2" />
                          Cek Domain
                        </>
                      )}
                    </Button>
                  </form>

                  {error && (
                    <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-start gap-3">
                      <AlertCircle size={20} className="mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-sm">Error</h4>
                        <p className="text-sm">{error}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Result Section */}
              {result && (
                <div className="space-y-2 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {result.map((item, index) => (
                    <div 
                      key={index}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-md border-l-4 shadow-sm ${
                        item.available 
                          ? "bg-green-200/20 border-green-200" 
                          : "bg-red-200/20 border-red-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.available ? (
                          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="text-green-600 h-5 w-5 shrink-0" />
                        ) : (
                          <HugeiconsIcon icon={CancelCircleIcon} className="text-red-600 h-5 w-5 shrink-0" />
                        )}
                        <span className={`font-medium text-sm sm:text-base ${item.available ? "text-green-800" : "text-red-800"}`}>
                          {item.available 
                            ? `${item.domain} Tersedia!` 
                            : `${item.domain} telah terdaftar`
                          }
                        </span>
                      </div>
                      
                      {item.available ? (
                        <Link to="/dashboard/hosting">
                          <Button 
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white min-w-[80px] font-bold uppercase text-xs h-8"
                          >
                            BELI
                          </Button>
                        </Link>
                      ) : (
                        <a 
                          href={`https://who.is/whois/${item.domain}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Button 
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 text-white min-w-[80px] font-bold uppercase text-xs h-8"
                          >
                            WHOIS
                          </Button>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Domain Pricing Reference */}
              <div className="mt-12">
                <DomainPrice />
              </div>

            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  )
}
