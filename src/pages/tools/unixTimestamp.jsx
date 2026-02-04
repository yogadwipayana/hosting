import { useState } from "react"
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  GlobeIcon, 
  LockPasswordIcon, 
  QrCodeIcon, 
  ColorsIcon, 
  Clock01Icon, 
  Search01Icon,
  Copy01Icon,
  ArrowRight01Icon
} from "@hugeicons/core-free-icons"

// Tool data similar to tools.jsx but grouped for sidebar
const toolCategories = [
  {
    title: "Server & Hosting",
    count: 10,
    items: [
      { id: "uptime-checker", title: "Website Uptime Checker", href: "/alat/uptime-checker", icon: GlobeIcon },
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
      { id: "unix-timestamp", title: "Unix Timestamp", href: "/alat/unix-timestamp", icon: Clock01Icon, active: true },
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
    <div className="w-full lg:w-72 shrink-0 space-y-6">
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
            <ToolsSidebar />

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
