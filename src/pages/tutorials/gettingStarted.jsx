import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  Rocket01Icon, 
  ArrowRight01Icon, 
  CheckmarkCircle02Icon,
  Globe02Icon,
  Database01Icon
} from "@hugeicons/core-free-icons"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Getting Started Steps Data
const steps = [
  {
    id: "step-1",
    title: "1. Persiapan VPS (Virtual Private Server)",
    content: (
      <div className="space-y-4">
        <p>Langkah pertama adalah memiliki server VPS. Anda bisa menggunakan provider populer seperti DigitalOcean, Vultr, Linode, atau provider lokal.</p>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h4 className="font-semibold text-blue-800 mb-2">Rekomendasi Spesifikasi Minimal:</h4>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>• 1 vCPU</li>
            <li>• 1 GB RAM</li>
            <li>• 20 GB SSD Storage</li>
            <li>• Ubuntu 20.04 / 22.04 LTS</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "step-2",
    title: "2. Akses Server via SSH",
    content: (
      <div className="space-y-4">
        <p>Setelah VPS aktif, Anda perlu mengaksesnya menggunakan SSH. Buka terminal (atau PuTTY di Windows) dan jalankan command berikut:</p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <code>ssh root@ip-address-server-anda</code>
        </div>
        <p className="text-sm text-muted-foreground">Masukkan password root yang diberikan oleh provider VPS Anda saat diminta.</p>
      </div>
    )
  },
  {
    id: "step-3",
    title: "3. Update System & Install Docker",
    content: (
      <div className="space-y-4">
        <p>Pastikan sistem operasi server Anda up-to-date dan install Docker untuk containerization.</p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="mb-2"># Update repositories</div>
          <div className="mb-4 text-green-400">apt update && apt upgrade -y</div>
          
          <div className="mb-2"># Install Docker</div>
          <div className="text-green-400">curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh</div>
        </div>
      </div>
    )
  },
  {
    id: "step-4",
    title: "4. Deploy Aplikasi Pertama",
    content: (
      <div className="space-y-4">
        <p>Sekarang server Anda sudah siap! Mari kita coba deploy web server Nginx sederhana menggunakan Docker.</p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <code className="text-green-400">docker run -d -p 80:80 --name my-web nginx</code>
        </div>
        <p>Buka browser dan akses <strong>http://ip-address-server-anda</strong>. Jika berhasil, Anda akan melihat halaman "Welcome to nginx!".</p>
      </div>
    )
  }
]

export default function GettingStartedPage() {
  return (
    <>
      <Helmet>
        <title>Getting Started - BelajarHosting</title>
        <meta name="description" content="Panduan awal memulai perjalanan deployment Anda. Dari setup VPS hingga deploy aplikasi pertama." />
      </Helmet>
      
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="absolute inset-0 bg-gray-50" />
          
          <div className="container relative mx-auto px-4 text-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
              <span className="text-sm font-medium text-primary">Tutorial Pemula</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6">
              Memulai Perjalanan <span className="text-primary">Deployment</span> Anda
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Panduan lengkap langkah demi langkah untuk menyiapkan server dan men-deploy aplikasi pertama Anda 
              dengan mudah dan aman.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border shadow-sm text-sm font-medium text-gray-700">
                <HugeiconsIcon icon={Rocket01Icon} size={18} className="text-blue-500" />
                VPS Setup
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border shadow-sm text-sm font-medium text-gray-700">
                <HugeiconsIcon icon={Globe02Icon} size={18} className="text-green-500" />
                Networking
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border shadow-sm text-sm font-medium text-gray-700">
                <HugeiconsIcon icon={Database01Icon} size={18} className="text-purple-500" />
                Database
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Langkah-langkah Persiapan</h2>
              <Accordion type="single" collapsible defaultValue="step-1" className="w-full space-y-4">
                {steps.map((step) => (
                  <AccordionItem key={step.id} value={step.id} className="border rounded-xl px-4 bg-white shadow-sm data-[state=open]:border-primary/50 data-[state=open]:ring-2 data-[state=open]:ring-primary/10 transition-all">
                    <AccordionTrigger className="hover:no-underline py-4 text-lg font-semibold">
                      {step.title}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-base text-gray-600 leading-relaxed">
                      {step.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Next Steps CTA */}
            <div className="bg-blue-600 rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
               {/* Decorative background circle */}
               <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
               <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
               
               <div className="relative z-10">
                 <h2 className="text-2xl sm:text-3xl font-bold mb-4">Siap untuk langkah berikutnya?</h2>
                 <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                   Setelah server siap, pelajari cara mendaftarkan domain dan mengamankan website Anda dengan SSL certificate gratis.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Link to="/edukasi/deploy">
                     <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto">
                       Lanjut ke Tutorial Deploy <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2" size={16} />
                     </Button>
                   </Link>
                   <Link to="/docs">
                     <Button size="lg" className="bg-transparent border border-white text-white hover:bg-white/10 w-full sm:w-auto shadow-none">
                       Baca Dokumentasi
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
