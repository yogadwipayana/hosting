import { useState, useRef } from "react"
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
  Download01Icon
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
      { id: "unix-timestamp", title: "Unix Timestamp", href: "/alat/unix-timestamp", icon: Clock01Icon },
    ]
  },
  {
    title: "Developer Utilities",
    count: 8,
    items: [
      { id: "qr-code", title: "QR Code", href: "/alat/qr-code", icon: QrCodeIcon, active: true },
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

// QR Code Generator Form Component
function QRCodeForm() {
  const [text, setText] = useState("")
  const [qrUrl, setQrUrl] = useState("")
  const [size, setSize] = useState(200)

  const generateQR = () => {
    if (!text) return
    // Using QR Server API for generating QR codes
    const encodedText = encodeURIComponent(text)
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`)
  }

  const downloadQR = () => {
    if (!qrUrl) return
    const link = document.createElement('a')
    link.href = qrUrl
    link.download = 'qrcode.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      {/* Input Text */}
      <div className="space-y-2">
        <Label htmlFor="qr-text" className="text-base font-medium">Teks atau URL</Label>
        <Input 
          id="qr-text"
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="Masukkan teks atau URL..."
          className="h-12 text-base bg-white"
        />
        <p className="text-sm text-muted-foreground">
          Masukkan URL, teks, atau data lainnya untuk di-encode ke QR code.
        </p>
      </div>

      {/* Size Selector */}
      <div className="space-y-2">
        <Label className="text-base font-medium">Ukuran: {size}x{size} px</Label>
        <div className="flex gap-2">
          {[100, 200, 300, 400].map((s) => (
            <Button 
              key={s}
              variant={size === s ? "default" : "outline"}
              onClick={() => setSize(s)}
              className="h-10"
            >
              {s}px
            </Button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <Button 
        onClick={generateQR}
        disabled={!text}
        className="w-full h-12 bg-slate-900 text-white hover:bg-slate-800"
      >
        <HugeiconsIcon icon={QrCodeIcon} size={18} className="mr-2" />
        Generate QR Code
      </Button>

      {/* QR Code Display */}
      {qrUrl && (
        <div className="rounded-xl border bg-white p-6 text-center animate-in fade-in slide-in-from-top-2">
          <img 
            src={qrUrl} 
            alt="Generated QR Code" 
            className="mx-auto mb-4 rounded-lg border"
          />
          <Button 
            onClick={downloadQR}
            variant="outline"
            className="h-10"
          >
            <HugeiconsIcon icon={Download01Icon} size={18} className="mr-2" />
            Download PNG
          </Button>
        </div>
      )}
    </div>
  )
}

// Main Page Component
export default function QRCodePage() {
  return (
    <>
      <Helmet>
        <title>QR Code Generator - BelajarHosting Tools</title>
        <meta name="description" content="Generate QR code untuk URL, teks, atau data lainnya. Download dalam berbagai format secara gratis." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-white pt-8 pb-16">
        <div className="container mx-auto px-4">
          
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Alat", href: "/alat" },
              { label: "QR Code", href: null },
            ]}
          />

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <ToolsSidebar />

            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
                  QR Code Generator
                </h1>
                <p className="text-lg text-muted-foreground">
                  Generate QR code untuk URL, teks, atau data lainnya dengan mudah dan cepat.
                </p>
              </div>

              <div className="p-6 md:p-8 rounded-2xl border border-gray-200 bg-white shadow-sm mb-12">
                 <QRCodeForm />
              </div>

              {/* Additional Information */}
              <div className="prose prose-gray max-w-none text-muted-foreground">
                <h2 className="text-xl font-semibold text-foreground mb-4">Apa itu QR Code?</h2>
                <p className="mb-4">
                  QR Code (Quick Response Code) adalah jenis barcode dua dimensi yang dapat menyimpan informasi seperti URL, teks, nomor telepon, dan lainnya. QR code dapat dipindai menggunakan kamera smartphone.
                </p>
                <h2 className="text-xl font-semibold text-foreground mb-4">Kegunaan QR Code</h2>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li><strong>Marketing:</strong> Link ke website, promo, atau media sosial.</li>
                  <li><strong>Pembayaran:</strong> Integrasi dengan e-wallet dan payment gateway.</li>
                  <li><strong>Inventory:</strong> Tracking produk dan manajemen stok.</li>
                  <li><strong>Event:</strong> Tiket digital dan check-in otomatis.</li>
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
