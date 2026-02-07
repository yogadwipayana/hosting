import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
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
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons"

// Custom SVG Icons
const GlobalIcon = () => <img src="/images/website-svgrepo-com.svg" alt="Website" className="h-6 w-6" />
const DatabaseIcon = () => <img src="/images/database-svgrepo-com.svg" alt="Database" className="h-6 w-6" />
const Robot01Icon = () => <img src="/images/bot-svgrepo-com.svg" alt="Bot" className="h-6 w-6" />
const SourceCodeIcon = () => <img src="/images/docker-icon.svg" alt="Docker" className="h-6 w-6" />
const CpuIcon = () => <img src="/images/bot-svgrepo-com.svg" alt="Bot API" className="h-6 w-6" />
const LayersIcon = () => <img src="/images/coolify.svg" alt="Coolify" className="h-6 w-6" />
const ZapIcon = () => <img src="/images/vercel-icon-svgrepo-com.svg" alt="Vercel" className="h-6 w-6" />
const CommandIcon = () => <img src="/images/devops-svgrepo-com.svg" alt="DevOps" className="h-6 w-6" />
const RailwayIcon = () => <img src="/images/railway.svg" alt="Railway" className="h-6 w-6" />
const N8nIcon = () => <img src="/images/n8n.svg" alt="n8n" className="h-6 w-6" />
const SupabaseIcon = () => <img src="/images/supabase-icon.svg" alt="Supabase" className="h-6 w-6" />
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

// Hero Section
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-24 lg:pt-24 lg:pb-32">
      {/* Background - Solid Color */}
      <div className="absolute inset-0 bg-gray-50" />

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
              <Link to="/edukasi/getting-started">
                <Button size="lg" className="rounded-lg bg-primary hover:bg-primary/90 px-8">
                  Mulai Belajar Gratis
                  <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2" size={16} />
                </Button>
              </Link>
              <Link to="/edukasi/getting-started">
                <Button size="lg" variant="outline" className="rounded-lg border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700">
                  Lihat Tutorial
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} color="var(--primary)" />
                <span>Gratis Selamanya</span>
              </div>
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} color="var(--primary)" />
                <span>Bahasa Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} color="var(--primary)" />
                <span>Update Berkala</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative lg:pl-8">
            <div className="relative rounded-2xl bg-blue-100 p-1">
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
                    <div className="rounded-lg bg-primary/5 p-4">
                      <div className="text-2xl font-bold text-primary">10K+</div>
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
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} color="#22c55e" />
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
      icon: GlobalIcon,
      title: "Deploy Website",
      description: "Pelajari cara deploy website statis dan dinamis menggunakan Vercel, Netlify, Cloudflare Pages, dan VPS.",
      count: "15 Tutorial",
      color: "bg-blue-100",
      iconColor: "#2563eb",
    },
    {
      icon: N8nIcon,
      title: "n8n Automation",
      description: "Setup n8n workflow automation di server sendiri. Integrasikan dengan berbagai layanan tanpa batas.",
      count: "8 Tutorial",
      color: "bg-blue-100",
      iconColor: "#7c3aed",
    },
    {
      icon: DatabaseIcon,
      title: "Database",
      description: "Deploy PostgreSQL, MySQL, MongoDB, dan Redis. Pelajari backup, scaling, dan optimasi database.",
      count: "12 Tutorial",
      color: "bg-blue-100",
      iconColor: "#2563eb",
    },
    {
      icon: LayersIcon,
      title: "Coolify & Dokploy",
      description: "Setup platform deployment self-hosted. Deploy aplikasi dengan fitur CI/CD dan manajemen otomatis.",
      count: "10 Tutorial",
      color: "bg-blue-100",
      iconColor: "#7c3aed",
    },
    {
      icon: CpuIcon,
      title: "Bot & API",
      description: "Deploy bot Telegram, Discord, WhatsApp, dan REST API dengan webhook dan autoscaling.",
      count: "7 Tutorial",
      color: "bg-blue-100",
      iconColor: "#2563eb",
    },
    {
      icon: CommandIcon,
      title: "DevOps Tools",
      description: "Pelajari Docker, Docker Compose, Nginx, SSL certificates, dan best practices deployment.",
      count: "8 Tutorial",
      color: "bg-blue-100",
      iconColor: "#7c3aed",
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
                  <feature.icon />
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
                  to="/blog"
                  className="inline-flex items-center text-sm font-medium text-primary group-hover:underline"
                >
                  Lihat Tutorial
                  <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
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
    { name: "Vercel", category: "Frontend Hosting", icon: ZapIcon, href: "https://vercel.com" },
    { name: "Railway", category: "Backend Hosting", icon: RailwayIcon, href: "https://railway.app" },
    { name: "Supabase", category: "Database", icon: SupabaseIcon, href: "https://supabase.com" },
    { name: "Coolify", category: "Self-Hosted", icon: LayersIcon, href: "https://coolify.io" },
    { name: "Docker", category: "Container", icon: SourceCodeIcon, href: "https://www.docker.com" },
    { name: "n8n", category: "Automation", icon: N8nIcon, href: "https://n8n.io" },
  ]

  return (
    <section id="tools" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl bg-gray-50 border border-gray-200 p-8 lg:p-12">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                Tools & Platform Populer
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Pelajari cara menggunakan platform hosting dan tools populer yang digunakan
                oleh developer profesional di seluruh dunia.
              </p>
              <Link to="/alat">
                <Button className="rounded-lg bg-primary hover:bg-primary/90">
                  Lihat Semua Tools
                  <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {tools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm border hover:border-primary/50 transition-colors group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <tool.icon />
                  </div>
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{tool.category}</p>
                  </div>
                </a>
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

// Landing Page Component
export default function LandingPage() {
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
