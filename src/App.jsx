import { useState } from 'react'
import { Routes, Route, Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { useClarity } from "@/hooks/useClarity"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Globe,
  Database,
  Bot,
  Server,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  Zap,
  Terminal
} from "lucide-react"

// Navigation Component
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Server className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">BelajarHosting</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Beranda
          </Link>
          <Link to="#produk" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Produk
          </Link>
          <Link to="#alat" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Alat
          </Link>
          <Link to="#edukasi" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Edukasi
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-lg">
            Masuk
          </Button>
          <Button size="sm" className="rounded-lg bg-primary hover:bg-primary/90">
            Mulai Belajar
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4">
          <nav className="flex flex-col gap-3">
            <Link to="/" className="text-base font-medium text-foreground">
              Beranda
            </Link>
            <Link to="#produk" className="text-base font-medium text-muted-foreground">
              Produk
            </Link>
            <Link to="#alat" className="text-base font-medium text-muted-foreground">
              Alat
            </Link>
            <Link to="#edukasi" className="text-base font-medium text-muted-foreground">
              Edukasi
            </Link>
            <div className="flex flex-col gap-2 pt-3 border-t border-border">
              <Button variant="outline" className="w-full rounded-lg">
                Masuk
              </Button>
              <Button className="w-full rounded-lg bg-primary hover:bg-primary/90">
                Mulai Belajar
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-24 lg:pt-24 lg:pb-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      <div className="container relative mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Content */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">Gratis untuk pemula</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Pelajari Cara Deploy
              <span className="text-primary"> Website & Aplikasi</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              Panduan lengkap untuk deploy website, database, n8n automation, Coolify,
              dan bot di berbagai platform hosting. Dari nol sampai production-ready.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button size="lg" className="rounded-lg bg-primary hover:bg-primary/90 px-8">
                Mulai Belajar Gratis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-lg">
                Lihat Tutorial
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Gratis Selamanya</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Bahasa Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Update Berkala</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative lg:pl-8">
            <div className="relative rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-1">
              <div className="rounded-xl bg-card p-6 shadow-lg">
                <div className="space-y-4">
                  {/* Code Preview Card */}
                  <div className="rounded-lg bg-muted p-4 font-mono text-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="ml-2 text-muted-foreground text-xs">terminal</span>
                    </div>
                    <p className="text-green-600 dark:text-green-400">$ git push origin main</p>
                    <p className="text-muted-foreground">Enumerating objects: 15, done.</p>
                    <p className="text-muted-foreground">Counting objects: 100% (15/15), done.</p>
                    <p className="text-primary">→ Deployed to production! ✅</p>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-primary/5 p-4">
                      <div className="text-2xl font-bold text-primary">50+</div>
                      <div className="text-sm text-muted-foreground">Tutorial Lengkap</div>
                    </div>
                    <div className="rounded-lg bg-accent/10 p-4">
                      <div className="text-2xl font-bold text-accent">10K+</div>
                      <div className="text-sm text-muted-foreground">Developer Aktif</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 rounded-lg bg-card border shadow-lg p-3 animate-bounce">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Deploy Berhasil!</p>
                  <p className="text-xs text-muted-foreground">Website anda online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Globe,
      title: "Deploy Website",
      description: "Pelajari cara deploy website statis dan dinamis menggunakan Vercel, Netlify, Cloudflare Pages, dan VPS.",
      count: "15 Tutorial",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      icon: Bot,
      title: "n8n Automation",
      description: "Setup n8n workflow automation di server sendiri. Integrasikan dengan berbagai layanan tanpa batas.",
      count: "8 Tutorial",
      color: "bg-orange-500/10 text-orange-600",
    },
    {
      icon: Database,
      title: "Database",
      description: "Deploy PostgreSQL, MySQL, MongoDB, dan Redis. Pelajari backup, scaling, dan optimasi database.",
      count: "12 Tutorial",
      color: "bg-green-500/10 text-green-600",
    },
    {
      icon: Layers,
      title: "Coolify & Dokploy",
      description: "Setup platform deployment self-hosted. Deploy aplikasi dengan fitur CI/CD dan manajemen otomatis.",
      count: "10 Tutorial",
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      icon: Cpu,
      title: "Bot & API",
      description: "Deploy bot Telegram, Discord, WhatsApp, dan REST API dengan webhook dan autoscaling.",
      count: "7 Tutorial",
      color: "bg-pink-500/10 text-pink-600",
    },
    {
      icon: Terminal,
      title: "DevOps Tools",
      description: "Pelajari Docker, Docker Compose, Nginx, SSL certificates, dan best practices deployment.",
      count: "8 Tutorial",
      color: "bg-cyan-500/10 text-cyan-600",
    },
  ]

  return (
    <section id="tutorial" className="bg-muted/50 py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Jelajahi Materi Belajar
          </h2>
          <p className="text-lg text-muted-foreground">
            Pilih topik yang ingin anda pelajari. Semua tutorial disusun langkah demi langkah
            dengan penjelasan yang mudah dipahami.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="group cursor-pointer border-0 shadow-sm hover:shadow-md transition-all">
              <CardHeader>
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color} mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                    {feature.count}
                  </span>
                </div>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  to="#"
                  className="inline-flex items-center text-sm font-medium text-primary group-hover:underline"
                >
                  Lihat Tutorial
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Tools Section
function ToolsSection() {
  const tools = [
    { name: "Vercel", category: "Frontend Hosting", icon: Zap },
    { name: "Railway", category: "Backend Hosting", icon: Server },
    { name: "Supabase", category: "Database", icon: Database },
    { name: "Coolify", category: "Self-Hosted", icon: Layers },
    { name: "Docker", category: "Container", icon: Code2 },
    { name: "n8n", category: "Automation", icon: Bot },
  ]

  return (
    <section id="tools" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl bg-gradient-to-br from-primary/5 via-background to-accent/5 p-8 lg:p-12">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                Tools & Platform Populer
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Pelajari cara menggunakan platform hosting dan tools populer yang digunakan
                oleh developer profesional di seluruh dunia.
              </p>
              <Button className="rounded-lg bg-primary hover:bg-primary/90">
                Lihat Semua Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm border hover:border-primary/50 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <tool.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{tool.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      question: "Apakah tutorial di BelajarHosting gratis?",
      answer:
        "Ya, semua tutorial di BelajarHosting dapat diakses secara gratis. Kami percaya bahwa ilmu tentang deployment dan hosting seharusnya tersedia untuk semua orang.",
    },
    {
      question: "Saya pemula, apakah bisa mengikuti tutorial ini?",
      answer:
        "Tentu saja! Tutorial kami dirancang untuk pemula. Kami menjelaskan setiap langkah dengan detail dan menyediakan penjelasan konsep dasar yang diperlukan.",
    },
    {
      question: "Platform hosting mana yang paling cocok untuk pemula?",
      answer:
        "Untuk pemula, kami merekomendasikan Vercel atau Netlify untuk website statis, dan Railway atau Render untuk aplikasi backend. Semua platform ini memiliki free tier yang cukup untuk belajar.",
    },
    {
      question: "Apakah saya perlu kartu kredit untuk deploy?",
      answer:
        "Tidak semua platform memerlukan kartu kredit. Vercel, Netlify, dan Railway memiliki free tier yang tidak memerlukan kartu kredit. Namun, beberapa layanan seperti AWS dan GCP memerlukan verifikasi kartu kredit.",
    },
    {
      question: "Bagaimana cara mendapatkan bantuan jika saya mengalami masalah?",
      answer:
        "Anda bisa bergabung dengan komunitas Discord kami untuk bertanya dan berdiskusi. Tim kami juga aktif di sana untuk membantu menjawab pertanyaan.",
    },
  ]

  return (
    <section id="faq" className="bg-muted/50 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Pertanyaan Umum
            </h2>
            <p className="text-lg text-muted-foreground">
              Jawaban untuk pertanyaan yang sering ditanyakan tentang BelajarHosting.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  const footerLinks = {
    tutorial: [
      { name: "Deploy Website", href: "#" },
      { name: "n8n Automation", href: "#" },
      { name: "Database", href: "#" },
      { name: "Coolify", href: "#" },
      { name: "Bot Development", href: "#" },
    ],
    resources: [
      { name: "Blog", href: "#" },
      { name: "Snippets", href: "#" },
      { name: "Templates", href: "#" },
      { name: "Cheatsheet", href: "#" },
    ],
    community: [
      { name: "Discord", href: "#" },
      { name: "GitHub", href: "#" },
      { name: "Twitter", href: "#" },
      { name: "YouTube", href: "#" },
    ],
    company: [
      { name: "Tentang Kami", href: "#" },
      { name: "Kontak", href: "#" },
      { name: "Kebijakan Privasi", href: "#" },
      { name: "Syarat Penggunaan", href: "#" },
    ],
  }

  return (
    <footer className="bg-[#111827] text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Server className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-white">BelajarHosting</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Platform belajar deployment dan hosting untuk developer Indonesia.
              Dari pemula hingga mahir, semua bisa belajar di sini.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Discord</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Tutorial</h3>
            <ul className="space-y-3">
              {footerLinks.tutorial.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} BelajarHosting. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Dibuat dengan ❤️ untuk developer Indonesia
          </p>
        </div>
      </div>
    </footer>
  )
}

// Landing Page Component
function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Belajar Hosting - Panduan Deploy Website & Aplikasi</title>
        <meta name="description" content="Pelajari cara deploy website, database, n8n, Coolify, dan bot. Tutorial lengkap dalam Bahasa Indonesia untuk pemula hingga mahir." />
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ToolsSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}

// Main App Component
export default function App() {
  useClarity()

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  )
}
