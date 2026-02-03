import { useState } from "react"
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, GlobeIcon, LockPasswordIcon, QrCodeIcon, ColorsIcon, Clock01Icon, Search01Icon } from "@hugeicons/core-free-icons"

// Tool data matching Navbar.jsx menuData.alat
const alatList = [
  {
    id: "uptime-checker",
    title: "Website Uptime Checker",
    description: "Cek status website anda secara real-time. Verifikasi apakah server online atau down.",
    icon: GlobeIcon,
    href: "/alat/uptime-checker",
    category: "Server & Hosting",
    color: "bg-blue-100",
    iconColor: "#2563eb",
  },
  {
    id: "password-generator",
    title: "Password Generator",
    description: "Buat password kuat dan aman untuk aplikasi dan database Anda dengan mudah.",
    icon: LockPasswordIcon,
    href: "/alat/password-generator",
    category: "Security",
    color: "bg-violet-100",
    iconColor: "#7c3aed",
  },
  {
    id: "qr-code",
    title: "QR Code",
    description: "Generate QR code untuk URL, teks, atau data lainnya. Download dalam berbagai format.",
    icon: QrCodeIcon,
    href: "/alat/qr-code",
    category: "Developer Tools",
    color: "bg-blue-100",
    iconColor: "#2563eb",
  },
  {
    id: "color-converter",
    title: "Color Converter",
    description: "Konversi warna antara HEX, RGB, HSL. Copy nilai dengan satu klik.",
    icon: ColorsIcon,
    href: "/alat/color-converter",
    category: "Developer Tools",
    color: "bg-violet-100",
    iconColor: "#7c3aed",
  },
  {
    id: "unix-timestamp",
    title: "Unix Timestamp",
    description: "Convert Unix timestamp ke format tanggal yang mudah dibaca dan sebaliknya.",
    icon: Clock01Icon,
    href: "/alat/unix-timestamp",
    category: "Converters",
    color: "bg-blue-100",
    iconColor: "#2563eb",
  },
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

// Alat Hero Section
function AlatHero() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Alat", href: null },
            ]}
          />

          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-4">
            Alat & Kalkulator Hosting
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            Koleksi alat gratis untuk mengelola hosting, meningkatkan keamanan,
            dan mempercepat development website Anda.
          </p>

          {/* Search Bar */}
          <div className="relative flex items-center max-w-2xl">
            <div className="absolute left-4 flex items-center pointer-events-none">
              <HugeiconsIcon icon={Search01Icon} size={20} className="text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Cari alat (e.g. password, json, ssl)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-14 w-full rounded-xl border-gray-200 bg-white text-base shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Alat Card Component
function AlatCard({ alat }) {
  return (
    <Card className="group cursor-pointer border-0 shadow-sm hover:shadow-md transition-all h-full">
      <CardHeader className="pb-3">
        <div
          className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${alat.color} mb-4`}
        >
          <HugeiconsIcon icon={alat.icon} size={24} color={alat.iconColor} />
        </div>
        <CardTitle className="text-lg">{alat.title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {alat.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Link
          to={alat.href}
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          Buka Alat
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size={16}
            className="ml-1 transition-transform group-hover:translate-x-1"
          />
        </Link>
      </CardContent>
    </Card>
  )
}

// Alat Grid Section
function AlatGridSection() {
  const categories = ["Server & Hosting", "Security", "Developer Tools", "Converters"]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              Semua Alat
            </h2>
            <p className="text-muted-foreground">
              Pilih alat yang Anda butuhkan dari kategori berikut.
            </p>
          </div>

          {/* Alat Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {alatList.map((alat) => (
              <AlatCard key={alat.id} alat={alat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// More Alat CTA Section
function MoreAlatSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-2xl bg-white border border-gray-200 p-8 lg:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
              Butuh Alat Lainnya?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Kami terus menambahkan alat baru untuk membantu developer dan DevOps.
              Punya saran? Beritahu kami!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="rounded-lg bg-primary hover:bg-primary/90">
                Request Alat Baru
              </Button>
              <Button variant="outline" className="rounded-lg">
                Lihat Roadmap
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main Tools Page
export default function ToolsPage() {
  return (
    <>
      <Helmet>
        <title>Alat & Kalkulator Hosting - BelajarHosting</title>
        <meta
          name="description"
          content="Koleksi alat gratis untuk mengelola hosting, meningkatkan keamanan, dan mempercepat development website Anda."
        />
      </Helmet>
      <Navbar />
      <main>
        <AlatHero />
        <AlatGridSection />
        <MoreAlatSection />
      </main>
      <Footer />
    </>
  )
}
