import { useState, useRef } from "react"
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ToolsSidebar } from "@/components/ToolsSidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HugeiconsIcon } from "@hugeicons/react"
import { QrCodeIcon, Download01Icon } from "@hugeicons/core-free-icons"



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
            <ToolsSidebar activeToolId="qr-code" />

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
