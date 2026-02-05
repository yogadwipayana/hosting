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
import { Copy01Icon, RefreshIcon } from "@hugeicons/core-free-icons"



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



// Password Generator Form Component
function PasswordGeneratorForm() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    let charset = ""
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"
    
    if (charset === "") {
      setPassword("Pilih minimal satu opsi karakter")
      return
    }

    let result = ""
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(result)
    setCopied(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Generated Password Display */}
      <div className="space-y-2">
        <Label className="text-base font-medium">Password yang Dihasilkan</Label>
        <div className="flex gap-2">
          <Input 
            value={password} 
            readOnly 
            placeholder="Klik 'Generate' untuk membuat password"
            className="h-12 text-base bg-white font-mono"
          />
          <Button 
            onClick={copyToClipboard} 
            variant="outline"
            disabled={!password}
            className="h-12 px-4"
          >
            <HugeiconsIcon icon={Copy01Icon} size={18} />
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>

      {/* Length Slider */}
      <div className="space-y-2">
        <Label className="text-base font-medium">Panjang Password: {length}</Label>
        <input 
          type="range" 
          min="8" 
          max="64" 
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>8</span>
          <span>64</span>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center gap-3 p-3 rounded-lg border bg-white cursor-pointer hover:bg-gray-50">
          <input 
            type="checkbox" 
            checked={includeUppercase} 
            onChange={(e) => setIncludeUppercase(e.target.checked)}
            className="w-4 h-4 text-primary"
          />
          <span className="text-sm">Huruf Besar (A-Z)</span>
        </label>
        <label className="flex items-center gap-3 p-3 rounded-lg border bg-white cursor-pointer hover:bg-gray-50">
          <input 
            type="checkbox" 
            checked={includeLowercase} 
            onChange={(e) => setIncludeLowercase(e.target.checked)}
            className="w-4 h-4 text-primary"
          />
          <span className="text-sm">Huruf Kecil (a-z)</span>
        </label>
        <label className="flex items-center gap-3 p-3 rounded-lg border bg-white cursor-pointer hover:bg-gray-50">
          <input 
            type="checkbox" 
            checked={includeNumbers} 
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            className="w-4 h-4 text-primary"
          />
          <span className="text-sm">Angka (0-9)</span>
        </label>
        <label className="flex items-center gap-3 p-3 rounded-lg border bg-white cursor-pointer hover:bg-gray-50">
          <input 
            type="checkbox" 
            checked={includeSymbols} 
            onChange={(e) => setIncludeSymbols(e.target.checked)}
            className="w-4 h-4 text-primary"
          />
          <span className="text-sm">Simbol (!@#$%)</span>
        </label>
      </div>

      {/* Generate Button */}
      <Button 
        onClick={generatePassword}
        className="w-full h-12 bg-slate-900 text-white hover:bg-slate-800"
      >
        <HugeiconsIcon icon={RefreshIcon} size={18} className="mr-2" />
        Generate Password
      </Button>
    </div>
  )
}

// Main Page Component
export default function PasswordGeneratorPage() {
  return (
    <>
      <Helmet>
        <title>Password Generator - BelajarHosting Tools</title>
        <meta name="description" content="Buat password kuat dan aman untuk aplikasi dan database Anda dengan mudah menggunakan generator password gratis ini." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-white pt-8 pb-16">
        <div className="container mx-auto px-4">
          
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Alat", href: "/alat" },
              { label: "Password Generator", href: null },
            ]}
          />

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <ToolsSidebar activeToolId="password-generator" />

            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
                  Password Generator
                </h1>
                <p className="text-lg text-muted-foreground">
                  Buat password yang kuat dan aman untuk melindungi akun, aplikasi, dan database Anda.
                </p>
              </div>

              <div className="p-6 md:p-8 rounded-2xl border border-gray-200 bg-white shadow-sm mb-12">
                 <PasswordGeneratorForm />
              </div>

              {/* Additional Information */}
              <div className="prose prose-gray max-w-none text-muted-foreground">
                <h2 className="text-xl font-semibold text-foreground mb-4">Tips Password yang Aman</h2>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li><strong>Panjang minimal 12 karakter:</strong> Semakin panjang password, semakin sulit ditebak.</li>
                  <li><strong>Kombinasi karakter:</strong> Gunakan huruf besar, huruf kecil, angka, dan simbol.</li>
                  <li><strong>Hindari informasi pribadi:</strong> Jangan gunakan nama, tanggal lahir, atau kata-kata umum.</li>
                  <li><strong>Password unik:</strong> Gunakan password berbeda untuk setiap akun.</li>
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
