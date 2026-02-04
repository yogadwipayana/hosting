import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  Shield02Icon, 
  ArrowRight01Icon, 
  Settings01Icon,
  Database01Icon,
  CheckmarkCircle02Icon,
  Alert02Icon
} from "@hugeicons/core-free-icons"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Best Practices Data
const sections = [
  {
    title: "Security (Keamanan)",
    icon: Shield02Icon,
    items: [
      {
        title: "1. Gunakan SSH Key Authentication",
        content: "Non-aktifkan login password untuk root. Gunakan SSH Key yang jauh lebih aman dari serangan brute-force."
      },
      {
        title: "2. Setup Firewall (UFW)",
        content: "Selalu aktifkan UFW (Uncomplicated Firewall) dan hanya buka port yang diperlukan (ssh, http, https). Contoh: `ufw allow ssh`, `ufw allow 80`, `ufw enable`."
      },
      {
        title: "3. Update System Secara Berkala",
        content: "Jalankan `apt update && apt upgrade` secara rutin untuk menambal celah keamanan sistem operasi."
      }
    ]
  },
  {
    title: "Performance (Performa)",
    icon: Settings01Icon,
    items: [
      {
        title: "1. Gunakan Gzip/Brotli Compression",
        content: "Aktifkan kompresi di Nginx untuk mengurangi ukuran file yang dikirim ke browser. Tambahkan `gzip on;` di config Nginx."
      },
      {
        title: "2. Implementasi Caching",
        content: "Gunakan caching untuk konten statis (gambar, css, js) agar browser tidak perlu mendownload ulang setiap visit."
      },
      {
        title: "3. CDN (Content Delivery Network)",
        content: "Gunakan Cloudflare atau sejenisnya untuk mendistribusikan konten Anda dari server terdekat dengan user."
      }
    ]
  },
  {
    title: "Reliability (Keandalan)",
    icon: Database01Icon,
    items: [
      {
        title: "1. Backup Rutin",
        content: "Jangan pernah mengandalkan satu server saja. Backup database dan file penting ke storage terpisah (misal: S3 / Google Drive)."
      },
      {
        title: "2. Monitoring & Alerting",
        content: "Pasang monitoring tools seperti UptimeRobot atau Grafana agar Anda tahu segera saat server down."
      }
    ]
  }
]

export default function BestPracticesPage() {
  return (
    <>
      <Helmet>
        <title>Best Practices - BelajarHosting</title>
        <meta name="description" content="Kumpulan praktik terbaik untuk keamanan, performa, dan keandalan server Anda." />
      </Helmet>
      
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="absolute inset-0 bg-gray-50" />
          
          <div className="container relative mx-auto px-4 text-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
              <span className="text-sm font-medium text-primary">Expert Guide</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6">
              Server <span className="text-primary">Best Practices</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Tingkatkan keamanan, kecepatan, dan stabilitas infrastruktur Anda dengan 
              mengikuti standar industri yang teruji.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border shadow-sm text-sm font-medium text-gray-700">
                <HugeiconsIcon icon={Shield02Icon} size={18} className="text-blue-500" />
                Security
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border shadow-sm text-sm font-medium text-gray-700">
                <HugeiconsIcon icon={Settings01Icon} size={18} className="text-orange-500" />
                Performance
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border shadow-sm text-sm font-medium text-gray-700">
                <HugeiconsIcon icon={Database01Icon} size={18} className="text-green-500" />
                Reliability
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            
            <div className="space-y-12">
              {sections.map((section, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                      <HugeiconsIcon icon={section.icon} size={24} />
                    </div>
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {section.items.map((item, i) => (
                      <AccordionItem key={i} value={`item-${idx}-${i}`} className="border rounded-xl px-4 bg-white shadow-sm data-[state=open]:border-primary/50 data-[state=open]:ring-2 data-[state=open]:ring-primary/10 transition-all">
                        <AccordionTrigger className="hover:no-underline py-4 text-lg font-semibold text-left">
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-base text-gray-600 leading-relaxed">
                          {item.content}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            {/* Warning / Notes */}
            <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6 flex flex-col sm:flex-row gap-4">
               <div className="shrink-0">
                 <HugeiconsIcon icon={Alert02Icon} size={24} className="text-amber-600" />
               </div>
               <div>
                 <h4 className="font-semibold text-amber-800 mb-1">Penting: Selalu Test di Staging</h4>
                 <p className="text-sm text-amber-700">
                   Jangan pernah menerapkan perubahan konfigurasi langsung di production server tanpa mencobanya terlebih dahulu di environment staging atau local.
                 </p>
               </div>
            </div>

            {/* Next Steps CTA */}
            <div className="mt-16 bg-blue-600 rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
               <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
               
               <div className="relative z-10">
                 <h2 className="text-2xl sm:text-3xl font-bold mb-4">Butuh referensi lengkap?</h2>
                 <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                   Jelajahi dokumentasi teknis kami untuk panduan konfigurasi yang lebih mendalam.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Link to="/docs">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto">
                       Buka Dokumentasi <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2" size={16} />
                     </Button>
                   </Link>
                 </div>
               </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
