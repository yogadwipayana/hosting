import { useState } from "react"
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ToolsSidebar } from "@/components/ToolsSidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HugeiconsIcon } from "@hugeicons/react"
import { Copy01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"



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



// Unix Timestamp Converter Form Component
function UnixTimestampForm() {
  const [timestamp, setTimestamp] = useState("")
  const [dateString, setDateString] = useState("")
  const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000))
  const [copied, setCopied] = useState("")

  // Update current timestamp every second
  useState(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000))
    }, 1000)
    return () => clearInterval(interval)
  })

  const timestampToDate = () => {
    if (!timestamp) return
    const ts = parseInt(timestamp)
    if (isNaN(ts)) return
    
    // Handle both seconds and milliseconds
    const date = new Date(ts > 9999999999 ? ts : ts * 1000)
    setDateString(date.toLocaleString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    }))
  }

  const dateToTimestamp = () => {
    if (!dateString) return
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return
    setTimestamp(Math.floor(date.getTime() / 1000).toString())
  }

  const copyValue = (value, type) => {
    navigator.clipboard.writeText(value)
    setCopied(type)
    setTimeout(() => setCopied(""), 2000)
  }

  const useCurrentTimestamp = () => {
    setTimestamp(currentTimestamp.toString())
    const date = new Date(currentTimestamp * 1000)
    setDateString(date.toLocaleString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    }))
  }

  return (
    <div className="space-y-6">
      {/* Current Timestamp Display */}
      <div className="p-4 rounded-xl bg-slate-900 text-white">
        <div className="text-sm text-slate-400 mb-1">Unix Timestamp Saat Ini</div>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-mono font-bold">{currentTimestamp}</div>
          <Button 
            onClick={useCurrentTimestamp}
            variant="secondary"
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white"
          >
            Gunakan
          </Button>
        </div>
      </div>

      {/* Timestamp to Date */}
      <div className="space-y-2">
        <Label className="text-base font-medium">Unix Timestamp</Label>
        <div className="flex gap-2">
          <Input 
            type="number"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="1704067200"
            className="h-12 text-base bg-white font-mono"
          />
          <Button 
            onClick={() => copyValue(timestamp, "timestamp")}
            variant="outline"
            className="h-12 px-4"
            disabled={!timestamp}
          >
            <HugeiconsIcon icon={Copy01Icon} size={18} />
            {copied === "timestamp" ? "Copied!" : "Copy"}
          </Button>
        </div>
        <Button 
          onClick={timestampToDate}
          disabled={!timestamp}
          className="w-full h-10 bg-slate-900 text-white hover:bg-slate-800"
        >
          Convert to Date
          <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-2" />
        </Button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-muted-foreground">atau</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Date to Timestamp */}
      <div className="space-y-2">
        <Label className="text-base font-medium">Tanggal & Waktu</Label>
        <Input 
          type="datetime-local"
          value={dateString.includes('T') ? dateString : ''}
          onChange={(e) => setDateString(e.target.value)}
          className="h-12 text-base bg-white"
        />
        <Button 
          onClick={dateToTimestamp}
          variant="outline"
          className="w-full h-10"
        >
          Convert to Timestamp
          <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-2" />
        </Button>
      </div>

      {/* Result Display */}
      {dateString && !dateString.includes('T') && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200">
          <div className="text-sm text-green-700 font-medium mb-1">Hasil Konversi</div>
          <div className="text-lg text-green-900">{dateString}</div>
        </div>
      )}
    </div>
  )
}

// Main Page Component
export default function UnixTimestampPage() {
  return (
    <>
      <Helmet>
        <title>Unix Timestamp Converter - BelajarHosting Tools</title>
        <meta name="description" content="Convert Unix timestamp ke format tanggal yang mudah dibaca dan sebaliknya. Tool gratis untuk developer." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-white pt-8 pb-16">
        <div className="container mx-auto px-4">
          
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Alat", href: "/alat" },
              { label: "Unix Timestamp", href: null },
            ]}
          />

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <ToolsSidebar activeToolId="unix-timestamp" />

            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
                  Unix Timestamp Converter
                </h1>
                <p className="text-lg text-muted-foreground">
                  Konversi Unix timestamp ke format tanggal yang mudah dibaca dan sebaliknya.
                </p>
              </div>

              <div className="p-6 md:p-8 rounded-2xl border border-gray-200 bg-white shadow-sm mb-12">
                 <UnixTimestampForm />
              </div>

              {/* Additional Information */}
              <div className="prose prose-gray max-w-none text-muted-foreground">
                <h2 className="text-xl font-semibold text-foreground mb-4">Apa itu Unix Timestamp?</h2>
                <p className="mb-4">
                  Unix timestamp adalah sistem penghitungan waktu yang menyatakan jumlah detik sejak 1 Januari 1970 00:00:00 UTC (Unix Epoch). Format ini banyak digunakan dalam pemrograman dan sistem operasi.
                </p>
                <h2 className="text-xl font-semibold text-foreground mb-4">Keuntungan Unix Timestamp</h2>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li><strong>Universal:</strong> Tidak tergantung pada timezone atau format lokal.</li>
                  <li><strong>Mudah dibandingkan:</strong> Perbandingan waktu menjadi operasi aritmatika sederhana.</li>
                  <li><strong>Compact:</strong> Representasi waktu dalam satu angka integer.</li>
                  <li><strong>Standar industri:</strong> Didukung oleh hampir semua bahasa pemrograman.</li>
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
