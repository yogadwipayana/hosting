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
import { Copy01Icon } from "@hugeicons/core-free-icons"



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
            className="h-12 px-4 bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900"
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
            <ToolsSidebar activeToolId="color-converter" />

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
