import { useState, useMemo, useCallback } from "react"
import { Helmet } from "react-helmet-async"
import { HugeiconsIcon } from "@hugeicons/react"
import { Footer } from "@/components/Footer"
import {
  BookOpen01Icon,
  Rocket01Icon,
  Database01Icon,
  Globe02Icon,
  Shield02Icon,
  Menu01Icon
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"

// Documentation components
import { DocLayout } from "@/components/documentation/DocLayout"
import { DocSidebar } from "@/components/documentation/DocSidebar"
import { DocSearch } from "@/components/documentation/DocSearch"
import { DocContent } from "@/components/documentation/DocContent"

// Hooks
import { useDocumentation } from "@/hooks/useDocumentation"
import { useDocSearch } from "@/hooks/useDocSearch"

// Static documentation data (fallback when API is not available)
const staticCategories = [
  {
    id: "intro",
    name: "Introduction",
    icon: BookOpen01Icon,
    docs: [
      { id: "intro-what-is", title: "Apa itu BelajarHosting?" },
      { id: "intro-features", title: "Fitur Utama" },
    ]
  },
  {
    id: "getting-started",
    name: "Getting Started",
    icon: Rocket01Icon,
    docs: [
      { id: "start-requirements", title: "Persyaratan Sistem" },
      { id: "start-account", title: "Membuat Akun" },
      { id: "start-dashboard", title: "Dashboard Overview" },
    ]
  },
  {
    id: "deployments",
    name: "Deployments",
    icon: Rocket01Icon,
    docs: [
      { id: "deploy-nodejs", title: "Deploy Node.js App" },
      { id: "deploy-docker", title: "Deploy Docker Container" },
      { id: "deploy-static", title: "Static Site Hosting" },
    ]
  },
  {
    id: "databases",
    name: "Databases",
    icon: Database01Icon,
    docs: [
      { id: "db-postgres", title: "PostgreSQL Setup" },
      { id: "db-mysql", title: "MySQL Setup" },
      { id: "db-backup", title: "Backup & Restore" },
    ]
  },
  {
    id: "domains",
    name: "Domain & SSL",
    icon: Globe02Icon,
    docs: [
      { id: "domain-custom", title: "Custom Domain" },
      { id: "domain-ssl", title: "SSL Installation" },
    ]
  }
]

// Static content for docs
const staticDocContent = {
  "intro-what-is": {
    id: "intro-what-is",
    title: "Apa itu BelajarHosting?",
    description: "Platform lengkap untuk belajar dan mengelola web hosting",
    content: `
      <p>BelajarHosting adalah platform edukasi dan layanan hosting yang dirancang untuk membantu developer, pemula maupun berpengalaman, dalam memahami dan mengelola infrastruktur web modern.</p>

      <h2 id="mengapa-belajarhosting">Mengapa BelajarHosting?</h2>
      <p>Kami menyediakan lingkungan yang aman dan terstruktur untuk belajar deployment, manajemen database, konfigurasi domain, dan banyak lagi.</p>

      <h2 id="fitur-utama">Fitur Utama</h2>
      <ul>
        <li><strong>Deploy dengan 1 Klik</strong> - Deploy aplikasi Anda dalam hitungan detik</li>
        <li><strong>Database Terkelola</strong> - PostgreSQL dan MySQL siap pakai</li>
        <li><strong>SSL Otomatis</strong> - Keamanan HTTPS tanpa konfigurasi manual</li>
        <li><strong>Dokumentasi Lengkap</strong> - Panduan step-by-step untuk setiap fitur</li>
      </ul>

      <h2 id="cara-memulai">Cara Memulai</h2>
      <p>Untuk mulai menggunakan BelajarHosting, Anda hanya perlu membuat akun gratis dan mengikuti panduan getting started kami.</p>
    `,
    headings: [
      { id: "mengapa-belajarhosting", text: "Mengapa BelajarHosting?", level: 2 },
      { id: "fitur-utama", text: "Fitur Utama", level: 2 },
      { id: "cara-memulai", text: "Cara Memulai", level: 2 },
    ],
    updatedAt: "2025-01-15",
    prev: null,
    next: { id: "intro-features", title: "Fitur Utama" }
  },
  "intro-features": {
    id: "intro-features",
    title: "Fitur Utama",
    description: "Jelajahi semua fitur yang tersedia di BelajarHosting",
    content: `
      <p>BelajarHosting dilengkapi dengan berbagai fitur modern untuk memudahkan deployment dan manajemen aplikasi Anda.</p>

      <h2 id="deployment">Deployment</h2>
      <p>Deploy aplikasi Node.js, Python, PHP, atau static site dengan mudah. Kami mendukung Docker untuk fleksibilitas maksimal.</p>

      <h2 id="database">Database</h2>
      <p>Kelola database PostgreSQL dan MySQL dengan interface yang intuitif. Backup otomatis dan restore point tersedia.</p>

      <h2 id="domain-ssl">Domain & SSL</h2>
      <p>Hubungkan custom domain Anda dengan mudah. SSL certificate otomatis dari Let's Encrypt.</p>
    `,
    headings: [
      { id: "deployment", text: "Deployment", level: 2 },
      { id: "database", text: "Database", level: 2 },
      { id: "domain-ssl", text: "Domain & SSL", level: 2 },
    ],
    updatedAt: "2025-01-15",
    prev: { id: "intro-what-is", title: "Apa itu BelajarHosting?" },
    next: { id: "start-requirements", title: "Persyaratan Sistem" }
  },
  "start-requirements": {
    id: "start-requirements",
    title: "Persyaratan Sistem",
    description: "Persiapan sebelum mulai menggunakan BelajarHosting",
    content: `
      <p>Sebelum mulai menggunakan BelajarHosting, pastikan Anda memenuhi persyaratan berikut.</p>

      <h2 id="kebutuhan-minimal">Kebutuhan Minimal</h2>
      <ul>
        <li>Browser modern (Chrome, Firefox, Safari, Edge)</li>
        <li>Koneksi internet stabil</li>
        <li>Email aktif untuk verifikasi</li>
      </ul>

      <h2 id="pengetahuan-dasar">Pengetahuan Dasar</h2>
      <p>Untuk hasil terbaik, disarankan memiliki pemahaman dasar tentang:</p>
      <ul>
        <li>Command line / Terminal</li>
        <li>Git dan version control</li>
        <li>Dasar-dasar web development</li>
      </ul>
    `,
    headings: [
      { id: "kebutuhan-minimal", text: "Kebutuhan Minimal", level: 2 },
      { id: "pengetahuan-dasar", text: "Pengetahuan Dasar", level: 2 },
    ],
    updatedAt: "2025-01-15",
    prev: { id: "intro-features", title: "Fitur Utama" },
    next: { id: "start-account", title: "Membuat Akun" }
  },
  "start-account": {
    id: "start-account",
    title: "Membuat Akun",
    description: "Panduan membuat akun BelajarHosting",
    content: `
      <p>Membuat akun di BelajarHosting cepat dan mudah. Ikuti langkah-langkah berikut.</p>

      <h2 id="langkah-1">Langkah 1: Registrasi</h2>
      <p>Kunjungi halaman register dan isi form dengan email dan password Anda.</p>

      <h2 id="langkah-2">Langkah 2: Verifikasi Email</h2>
      <p>Cek inbox email Anda dan klik link verifikasi yang kami kirimkan.</p>

      <h2 id="langkah-3">Langkah 3: Login</h2>
      <p>Setelah verifikasi, login dengan kredensial Anda untuk mengakses dashboard.</p>
    `,
    headings: [
      { id: "langkah-1", text: "Langkah 1: Registrasi", level: 2 },
      { id: "langkah-2", text: "Langkah 2: Verifikasi Email", level: 2 },
      { id: "langkah-3", text: "Langkah 3: Login", level: 2 },
    ],
    updatedAt: "2025-01-15",
    prev: { id: "start-requirements", title: "Persyaratan Sistem" },
    next: { id: "start-dashboard", title: "Dashboard Overview" }
  },
  "start-dashboard": {
    id: "start-dashboard",
    title: "Dashboard Overview",
    description: "Mengenal dashboard BelajarHosting",
    content: `
      <p>Dashboard adalah pusat kontrol untuk mengelola semua project dan layanan Anda.</p>

      <h2 id="navigasi">Navigasi</h2>
      <p>Sidebar di sebelah kiri memberikan akses cepat ke semua fitur utama.</p>

      <h2 id="project-list">Daftar Project</h2>
      <p>Lihat semua project Anda dengan status deployment dan statistik penggunaan.</p>

      <h2 id="quick-actions">Quick Actions</h2>
      <p>Buat project baru, deploy aplikasi, atau kelola database dengan sekali klik.</p>
    `,
    headings: [
      { id: "navigasi", text: "Navigasi", level: 2 },
      { id: "project-list", text: "Daftar Project", level: 2 },
      { id: "quick-actions", text: "Quick Actions", level: 2 },
    ],
    updatedAt: "2025-01-15",
    prev: { id: "start-account", title: "Membuat Akun" },
    next: { id: "deploy-nodejs", title: "Deploy Node.js App" }
  },
  "deploy-nodejs": {
    id: "deploy-nodejs",
    title: "Deploy Node.js App",
    description: "Panduan lengkap deploy aplikasi Node.js",
    content: `
      <p>Deploy aplikasi Node.js Anda dengan mudah menggunakan BelajarHosting.</p>

      <h2 id="persiapan">Persiapan</h2>
      <p>Pastikan aplikasi Anda memiliki file package.json dengan script start yang benar.</p>

      <h2 id="environment-variables">Environment Variables</h2>
      <p>Tambahkan variabel lingkungan yang diperlukan di dashboard project Anda.</p>

      <h2 id="deployment-steps">Langkah Deployment</h2>
      <ol>
        <li>Upload kode Anda via Git atau drag-and-drop</li>
        <li>Pilih Node.js version yang sesuai</li>
        <li>Konfigurasi environment variables</li>
        <li>Klik Deploy</li>
      </ol>
    `,
    headings: [
      { id: "persiapan", text: "Persiapan", level: 2 },
      { id: "environment-variables", text: "Environment Variables", level: 2 },
      { id: "deployment-steps", text: "Langkah Deployment", level: 2 },
    ],
    updatedAt: "2025-01-15",
    prev: { id: "start-dashboard", title: "Dashboard Overview" },
    next: { id: "deploy-docker", title: "Deploy Docker Container" }
  },
  "deploy-docker": {
    id: "deploy-docker",
    title: "Deploy Docker Container",
    description: "Deploy aplikasi menggunakan Docker",
    content: `
      <p>Gunakan Docker untuk deployment yang konsisten dan portable.</p>

      <h2 id="dockerfile">Dockerfile</h2>
      <p>Pastikan project Anda memiliki Dockerfile yang valid di root directory.</p>

      <h2 id="docker-compose">Docker Compose (Opsional)</h2>
      <p>Untuk aplikasi multi-container, gunakan docker-compose.yml.</p>
    `,
    headings: [
      { id: "dockerfile", text: "Dockerfile", level: 2 },
      { id: "docker-compose", text: "Docker Compose (Opsional)", level: 2 },
    ],
    updatedAt: "2025-01-15",
    prev: { id: "deploy-nodejs", title: "Deploy Node.js App" },
    next: { id: "deploy-static", title: "Static Site Hosting" }
  },
  "deploy-static": {
    id: "deploy-static",
    title: "Static Site Hosting",
    description: "Deploy website static HTML/CSS/JS",
    content: `
      <p>Deploy website static dengan CDN global untuk performa optimal.</p>

      <h2 id="supported-frameworks">Framework yang Didukung</h2>
      <ul>
        <li>Next.js (Static Export)</li>
        <li>Gatsby</li>
        <li>Astro</li>
        <li>Plain HTML/CSS/JS</li>
      </ul>

      <h2 id="cdn">CDN Global</h2>
      <p>Semua static site otomatis didistribusikan ke CDN global kami.</p>
    `,
    headings: [
      { id: "supported-frameworks", text: "Framework yang Didukung", level: 2 },
      { id: "cdn", text: "CDN Global", level: 2 },
    ],
    updatedAt: "2025-01-15",
    prev: { id: "deploy-docker", title: "Deploy Docker Container" },
    next: { id: "db-postgres", title: "PostgreSQL Setup" }
  },
  "db-postgres": {
    id: "db-postgres",
    title: "PostgreSQL Setup",
    description: "Setup dan konfigurasi database PostgreSQL",
    content: `
      <p>PostgreSQL adalah database relational yang powerful dan scalable.</p>

      <h2 id="create-database">Membuat Database</h2>
      <p>Buat database baru dari dashboard dengan sekali klik.</p>

      <h2 id="connection-string">Connection String</h2>
      <p>Gunakan connection string yang tersedia untuk koneksi dari aplikasi Anda.</p>

      <h2 id="extensions">Extensions</h2>
      <p>Aktifkan extensions seperti PostGIS, pg_trgm, dan lainnya sesuai kebutuhan.</p>
    `,
    headings: [
      { id: "create-database", text: "Membuat Database", level: 2 },
      { id: "connection-string", text: "Connection String", level: 2 },
      { id: "extensions", text: "Extensions", level: 2 },
    ],
    updatedAt: "2025-01-15",
    prev: { id: "deploy-static", title: "Static Site Hosting" },
    next: { id: "db-mysql", title: "MySQL Setup" }
  },
  "db-mysql": {
    id: "db-mysql",
    title: "MySQL Setup",
    description: "Setup dan konfigurasi database MySQL",
    content: `
      <p>MySQL adalah pilihan populer untuk aplikasi web dengan komunitas yang besar.</p>

      <h2 id="create-mysql">Membuat Database MySQL</h2>
      <p>Pilih MySQL saat membuat database baru di dashboard.</p>

      <h2 id="phpmyadmin">phpMyAdmin</h2>
      <p>Akses phpMyAdmin untuk manajemen database via GUI.</p>
    `,
    headings: [
      { id: "create-mysql", text: "Membuat Database MySQL", level: 2 },
      { id: "phpmyadmin", text: "phpMyAdmin", level: 2 },
    ],
    updatedAt: "2025-01-15",
    prev: { id: "db-postgres", title: "PostgreSQL Setup" },
    next: { id: "db-backup", title: "Backup & Restore" }
  },
  "db-backup": {
    id: "db-backup",
    title: "Backup & Restore",
    description: "Mengelola backup dan restore database",
    content: `
      <p>Lindungi data Anda dengan backup otomatis dan manual.</p>

      <h2 id="automatic-backup">Backup Otomatis</h2>
      <p>Backup harian otomatis disimpan selama 7 hari.</p>

      <h2 id="manual-backup">Backup Manual</h2>
      <p>Buat backup manual kapan saja dari dashboard.</p>

      <h2 id="restore">Restore</h2>
      <p>Restore database ke point-in-time tertentu.</p>
    `,
    headings: [
      { id: "automatic-backup", text: "Backup Otomatis", level: 2 },
      { id: "manual-backup", text: "Backup Manual", level: 2 },
      { id: "restore", text: "Restore", level: 2 },
    ],
    updatedAt: "2025-01-15",
    prev: { id: "db-mysql", title: "MySQL Setup" },
    next: { id: "domain-custom", title: "Custom Domain" }
  },
  "domain-custom": {
    id: "domain-custom",
    title: "Custom Domain",
    description: "Menghubungkan domain custom ke project",
    content: `
      <p>Gunakan domain Anda sendiri untuk project yang lebih profesional.</p>

      <h2 id="dns-setup">Setup DNS</h2>
      <p>Tambahkan CNAME record di DNS provider Anda.</p>

      <h2 id="verify-domain">Verifikasi Domain</h2>
      <p>Tunggu propagasi DNS dan verifikasi kepemilikan domain.</p>
    `,
    headings: [
      { id: "dns-setup", text: "Setup DNS", level: 2 },
      { id: "verify-domain", text: "Verifikasi Domain", level: 2 },
    ],
    updatedAt: "2025-01-15",
    prev: { id: "db-backup", title: "Backup & Restore" },
    next: { id: "domain-ssl", title: "SSL Installation" }
  },
  "domain-ssl": {
    id: "domain-ssl",
    title: "SSL Installation",
    description: "Mengaktifkan HTTPS dengan SSL certificate",
    content: `
      <p>SSL certificate otomatis untuk keamanan HTTPS.</p>

      <h2 id="lets-encrypt">Let's Encrypt</h2>
      <p>SSL certificate gratis dari Let's Encrypt otomatis diinstall.</p>

      <h2 id="auto-renewal">Auto Renewal</h2>
      <p>Certificate otomatis diperpanjang sebelum expired.</p>

      <h2 id="force-https">Force HTTPS</h2>
      <p>Aktifkan redirect otomatis dari HTTP ke HTTPS.</p>
    `,
    headings: [
      { id: "lets-encrypt", text: "Let's Encrypt", level: 2 },
      { id: "auto-renewal", text: "Auto Renewal", level: 2 },
      { id: "force-https", text: "Force HTTPS", level: 2 },
    ],
    updatedAt: "2025-01-15",
    prev: { id: "domain-custom", title: "Custom Domain" },
    next: null
  }
}

// Search index for static content
const searchIndex = Object.values(staticDocContent).map(doc => ({
  id: doc.id,
  title: doc.title,
  category: staticCategories.find(cat =>
    cat.docs.some(d => d.id === doc.id)
  )?.name || "General"
}))

export default function DocumentationsPage() {
  const [activeDocId, setActiveDocId] = useState("intro-what-is")
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  // Try to fetch from API, fallback to static data
  const { docs, categories, isLoading, error, refetch } = useDocumentation()
  const { query, setQuery, results, isSearching } = useDocSearch(300)

  // Use API data if available, otherwise use static data
  const displayCategories = categories.length > 0 ? categories : staticCategories

  // Get active doc content
  const activeDoc = useMemo(() => {
    // Try to find in API docs first
    const apiDoc = docs.find(d => d.id === activeDocId)
    if (apiDoc) return apiDoc

    // Fallback to static content
    return staticDocContent[activeDocId] || null
  }, [activeDocId, docs])

  // Handle doc selection
  const handleDocSelect = useCallback((docId) => {
    setActiveDocId(docId)
    setShowMobileSidebar(false)
    // Scroll to top of content
    const mainContent = document.getElementById("main-content")
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  // Handle search result selection
  const handleSearchSelect = useCallback((result) => {
    handleDocSelect(result.id)
    setQuery("")
  }, [handleDocSelect, setQuery])

  // Static search results when API is not available
  const searchResults = useMemo(() => {
    if (categories.length > 0) {
      // API is available, use API results
      return results
    }
    // Fallback to static search
    if (!query.trim()) return []
    return searchIndex.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, results, categories.length])

  // Update pagination links for active doc
  const docWithPagination = useMemo(() => {
    if (!activeDoc) return null

    // Find current doc in flattened list
    const allDocs = displayCategories.flatMap(cat => cat.docs)
    const currentIndex = allDocs.findIndex(d => d.id === activeDocId)

    const prev = currentIndex > 0 ? allDocs[currentIndex - 1] : null
    const next = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null

    return {
      ...activeDoc,
      prev: prev ? { id: prev.id, title: prev.title, onClick: () => handleDocSelect(prev.id) } : null,
      next: next ? { id: next.id, title: next.title, onClick: () => handleDocSelect(next.id) } : null,
      path: activeDoc.path || [
        { id: "docs", title: "Documentation", href: "/docs" },
        { id: activeDocId, title: activeDoc.title }
      ]
    }
  }, [activeDoc, activeDocId, displayCategories, handleDocSelect])

  return (
    <>
      <Helmet>
        <title>Dokumentasi - BelajarHosting</title>
        <meta name="description" content="Dokumentasi lengkap dan panduan teknis untuk menggunakan layanan BelajarHosting." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Header with Search */}
        <header className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Pusat Bantuan & Dokumentasi
              </h1>
              <p className="text-gray-600">
                Cari jawaban, tutorial, dan referensi teknis.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <DocSearch
                query={query}
                onQueryChange={setQuery}
                results={searchResults}
                isSearching={isSearching}
                onResultSelect={handleSearchSelect}
                placeholder="Cari topik dokumentasi (e.g. 'cara deploy docker')..."
              />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <DocLayout
          showMobileSidebar={showMobileSidebar}
          onToggleSidebar={() => setShowMobileSidebar(!showMobileSidebar)}
          sidebar={
            <DocSidebar
              categories={displayCategories}
              activeDocId={activeDocId}
              onDocSelect={handleDocSelect}
              onClose={() => setShowMobileSidebar(false)}
              showMobileClose={true}
            />
          }
        >
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden p-4 border-b border-gray-200 bg-white sticky top-0 z-30">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMobileSidebar(true)}
              className="flex items-center gap-2"
            >
              <HugeiconsIcon icon={Menu01Icon} size={18} />
              Menu Dokumentasi
            </Button>
          </div>

          {/* Doc Content */}
          <DocContent
            doc={docWithPagination}
            isLoading={isLoading}
            error={error}
            onRetry={refetch}
          />
        </DocLayout>
      </div>

      <Footer />
    </>
  )
}
