import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  BookOpen01Icon, 
  Rocket01Icon, 
  Database01Icon, 
  Globe02Icon,  
  Shield02Icon, 
  ArrowRight01Icon,
  Search01Icon,
  CheckmarkCircle02Icon
} from "@hugeicons/core-free-icons"
import { Input } from "@/components/ui/input"
import { useState } from "react"

// Documentation Sidebar Items
const sidebarItems = [
  {
    title: "Introduction",
    icon: BookOpen01Icon,
    items: [
      { title: "Apa itu BelajarHosting?", id: "intro-what-is" },
      { title: "Fitur Utama", id: "intro-features" },
    ]
  },
  {
    title: "Getting Started",
    icon: Rocket01Icon,
    items: [
      { title: "Persyaratan Sistem", id: "start-requirements" },
      { title: "Membuat Akun", id: "start-account" },
      { title: "Dashboard Overview", id: "start-dashboard" },
    ]
  },
  {
    title: "Deployments",
    icon: Rocket01Icon,
    items: [
      { title: "Deploy Node.js App", id: "deploy-nodejs" },
      { title: "Deploy Docker Container", id: "deploy-docker" },
      { title: "Static Site Hosting", id: "deploy-static" },
    ]
  },
  {
    title: "Databases",
    icon: Database01Icon,
    items: [
      { title: "PostgreSQL Setup", id: "db-postgres" },
      { title: "MySQL Setup", id: "db-mysql" },
      { title: "Backup & Restore", id: "db-backup" },
    ]
  },
  {
    title: "Domain & SSL",
    icon: Globe02Icon,
    items: [
      { title: "Custom Domain", id: "domain-custom" },
      { title: "SSL Installation", id: "domain-ssl" },
    ]
  }
]

// Main Documentation Content Component (Dummy Context)
const DocumentationContent = ({ sectionId }) => {
  return (
    <div className="prose prose-blue max-w-none">
      <h1>Documentation</h1>
      <p className="lead text-xl text-muted-foreground">
        Selamat datang di dokumentasi resmi BelajarHosting. Di sini Anda akan menemukan panduan lengkap 
        mulai dari setup awal hingga deployment aplikasi yang kompleks.
      </p>
      
      <div className="not-prose my-8 p-6 bg-blue-50 border border-blue-100 rounded-xl">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-900 mb-2">
          <HugeiconsIcon icon={Rocket01Icon} size={20} className="text-blue-600" />
          Quick Start
        </h3>
        <p className="text-blue-800 mb-4">
          Ingin segera mulai? Ikuti panduan 5 menit kami untuk men-deploy aplikasi pertama Anda.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Mulai Tutorial Cepat <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-2" />
        </Button>
      </div>

      <h2>Topik Populer</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
        {[
          "Cara connect ke VPS via SSH",
          "Deploy WordPress dengan 1-click",
          "Setup CI/CD dengan GitHub Actions",
          "Troubleshooting Error 502"
        ].map((topic, i) => (
           <div key={i} className="flex items-start gap-3 p-4 border rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer group">
             <HugeiconsIcon icon={BookOpen01Icon} size={20} className="text-gray-400 group-hover:text-blue-500 mt-1" />
             <span className="font-medium text-gray-700 group-hover:text-blue-700">{topic}</span>
           </div>
        ))}
      </div>
      
      <hr className="my-8 border-gray-200" />

      <h2>Masih Butuh Bantuan?</h2>
      <p>
        Jika Anda tidak menemukan jawaban di sini, silakan hubungi tim support kami atau bergabung dengan komunitas Discord kami.
      </p>
    </div>
  )
}

export default function DocumentasionsPage() {
  const [activeSection, setActiveSection] = useState("intro-what-is")

  return (
    <>
      <Helmet>
        <title>Dokumentasi - BelajarHosting</title>
        <meta name="description" content="Dokumentasi lengkap dan panduan teknis untuk menggunakan layanan BelajarHosting." />
      </Helmet>
      
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Header Search Section */}
        <section className="bg-gray-50 border-b border-gray-200 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Pusa Bantuan & Dokumentasi</h1>
            <p className="text-muted-foreground mb-8 text-lg">Cari jawaban, tutorial, dan referensi teknis.</p>
            
            <div className="max-w-2xl mx-auto relative">
               <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                 <HugeiconsIcon icon={Search01Icon} size={20} className="text-gray-400" />
               </div>
               <Input 
                 type="text" 
                 placeholder="Cari topik dokumentasi (e.g. 'cara deploy docker')..." 
                 className="pl-12 h-14 bg-white shadow-sm border-gray-200 focus:border-primary focus:ring-primary w-full rounded-xl text-base"
               />
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-72 shrink-0">
               <div className="sticky top-24">
                 <Accordion type="multiple" defaultValue={["Introduction", "Deployment"]} className="w-full space-y-4">
                   {sidebarItems.map((section, idx) => (
                     <AccordionItem key={section.title} value={section.title} className="border-none">
                       <AccordionTrigger className="py-2 hover:no-underline text-sm font-semibold text-foreground">
                         <div className="flex items-center gap-2">
                            <HugeiconsIcon icon={section.icon} size={18} className="text-primary" />
                            {section.title}
                         </div>
                       </AccordionTrigger>
                       <AccordionContent>
                         <div className="flex flex-col gap-1 border-l-2 border-gray-100 ml-2.5 pl-4 py-2">
                           {section.items.map((item) => (
                             <button
                               key={item.id}
                               onClick={() => setActiveSection(item.id)}
                               className={`text-left text-sm py-1.5 transition-colors ${
                                 activeSection === item.id 
                                  ? "text-primary font-medium" 
                                  : "text-muted-foreground hover:text-foreground"
                               }`}
                             >
                               {item.title}
                             </button>
                           ))}
                         </div>
                       </AccordionContent>
                     </AccordionItem>
                   ))}
                 </Accordion>
               </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0 pb-16">
              <DocumentationContent sectionId={activeSection} />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
