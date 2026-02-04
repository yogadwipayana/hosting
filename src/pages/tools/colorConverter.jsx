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
  Copy01Icon
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
      { id: "color-converter", title: "Color Converter", href: "/alat/color-converter", icon: ColorsIcon, active: true },
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

// Helper functions for color conversion
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

// Color Converter Form Component
function ColorConverterForm() {
  const [hexValue, setHexValue] = useState("#3b82f6")
  const [rgbValue, setRgbValue] = useState({ r: 59, g: 130, b: 246 })
  const [hslValue, setHslValue] = useState({ h: 217, s: 91, l: 60 })
  const [copied, setCopied] = useState("")

  const updateFromHex = (hex) => {
    setHexValue(hex)
    const rgb = hexToRgb(hex)
    if (rgb) {
      setRgbValue(rgb)
      setHslValue(rgbToHsl(rgb.r, rgb.g, rgb.b))
    }
  }

  const updateFromRgb = (r, g, b) => {
    setRgbValue({ r, g, b })
    setHexValue(rgbToHex(r, g, b))
    setHslValue(rgbToHsl(r, g, b))
  }

  const copyValue = (value, type) => {
    navigator.clipboard.writeText(value)
    setCopied(type)
    setTimeout(() => setCopied(""), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Color Preview */}
      <div className="flex items-center gap-4">
        <div 
          className="w-24 h-24 rounded-xl border-2 border-gray-200 shadow-inner"
          style={{ backgroundColor: hexValue }}
        />
        <div>
          <Label className="text-base font-medium">Preview Warna</Label>
          <p className="text-sm text-muted-foreground">
            Klik pada input warna untuk memilih warna baru
          </p>
          <input 
            type="color" 
            value={hexValue}
            onChange={(e) => updateFromHex(e.target.value)}
            className="mt-2 w-12 h-8 cursor-pointer"
          />
        </div>
      </div>

      {/* HEX Input */}
      <div className="space-y-2">
        <Label className="text-base font-medium">HEX</Label>
        <div className="flex gap-2">
          <Input 
            value={hexValue}
            onChange={(e) => updateFromHex(e.target.value)}
            placeholder="#000000"
            className="h-12 text-base bg-white font-mono"
          />
          <Button 
            onClick={() => copyValue(hexValue, "hex")}
            variant="outline"
            className="h-12 px-4"
          >
            <HugeiconsIcon icon={Copy01Icon} size={18} />
            {copied === "hex" ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>

      {/* RGB Input */}
      <div className="space-y-2">
        <Label className="text-base font-medium">RGB</Label>
        <div className="flex gap-2">
          <div className="flex-1 flex gap-2">
            <Input 
              type="number"
              min="0"
              max="255"
              value={rgbValue.r}
              onChange={(e) => updateFromRgb(parseInt(e.target.value) || 0, rgbValue.g, rgbValue.b)}
              placeholder="R"
              className="h-12 text-base bg-white text-center"
            />
            <Input 
              type="number"
              min="0"
              max="255"
              value={rgbValue.g}
              onChange={(e) => updateFromRgb(rgbValue.r, parseInt(e.target.value) || 0, rgbValue.b)}
              placeholder="G"
              className="h-12 text-base bg-white text-center"
            />
            <Input 
              type="number"
              min="0"
              max="255"
              value={rgbValue.b}
              onChange={(e) => updateFromRgb(rgbValue.r, rgbValue.g, parseInt(e.target.value) || 0)}
              placeholder="B"
              className="h-12 text-base bg-white text-center"
            />
          </div>
          <Button 
            onClick={() => copyValue(`rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`, "rgb")}
            variant="outline"
            className="h-12 px-4"
          >
            <HugeiconsIcon icon={Copy01Icon} size={18} />
            {copied === "rgb" ? "Copied!" : "Copy"}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground font-mono">
          rgb({rgbValue.r}, {rgbValue.g}, {rgbValue.b})
        </p>
      </div>

      {/* HSL Display */}
      <div className="space-y-2">
        <Label className="text-base font-medium">HSL</Label>
        <div className="flex gap-2">
          <Input 
            value={`hsl(${hslValue.h}, ${hslValue.s}%, ${hslValue.l}%)`}
            readOnly
            className="h-12 text-base bg-white font-mono"
          />
          <Button 
            onClick={() => copyValue(`hsl(${hslValue.h}, ${hslValue.s}%, ${hslValue.l}%)`, "hsl")}
            variant="outline"
            className="h-12 px-4"
          >
            <HugeiconsIcon icon={Copy01Icon} size={18} />
            {copied === "hsl" ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Main Page Component
export default function ColorConverterPage() {
  return (
    <>
      <Helmet>
        <title>Color Converter - BelajarHosting Tools</title>
        <meta name="description" content="Konversi warna antara HEX, RGB, HSL. Copy nilai dengan satu klik menggunakan tool gratis ini." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-white pt-8 pb-16">
        <div className="container mx-auto px-4">
          
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Alat", href: "/alat" },
              { label: "Color Converter", href: null },
            ]}
          />

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <ToolsSidebar />

            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
                  Color Converter
                </h1>
                <p className="text-lg text-muted-foreground">
                  Konversi warna antara format HEX, RGB, dan HSL dengan mudah. Salin nilai dengan satu klik.
                </p>
              </div>

              <div className="p-6 md:p-8 rounded-2xl border border-gray-200 bg-white shadow-sm mb-12">
                 <ColorConverterForm />
              </div>

              {/* Additional Information */}
              <div className="prose prose-gray max-w-none text-muted-foreground">
                <h2 className="text-xl font-semibold text-foreground mb-4">Format Warna</h2>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li><strong>HEX:</strong> Format hexadecimal (#RRGGBB), paling umum digunakan di CSS.</li>
                  <li><strong>RGB:</strong> Red, Green, Blue dengan nilai 0-255 untuk setiap channel.</li>
                  <li><strong>HSL:</strong> Hue, Saturation, Lightness - lebih intuitif untuk manipulasi warna.</li>
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
