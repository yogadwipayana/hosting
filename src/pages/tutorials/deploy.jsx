import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  Rocket01Icon, 
  ArrowRight01Icon, 
  Upload02Icon,
  Settings01Icon,
  Globe02Icon,
  CheckmarkCircle02Icon
} from "@hugeicons/core-free-icons"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Deploy Steps Data
const steps = [
  {
    id: "step-1",
    title: "1. Siapkan File Aplikasi Anda",
    content: (
      <div className="space-y-4">
        <p>Pastikan kode aplikasi Anda sudah siap. Untuk tutorial ini, kita asumsikan Anda ingin men-deploy file HTML/CSS/JS statis atau aplikasi Node.js.</p>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h4 className="font-semibold text-blue-800 mb-2">Checklist:</h4>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>• File utama (index.html atau app.js) ada di root folder</li>
            <li>• `package.json` sudah benar (jika Node.js)</li>
            <li>• Tidak ada hardcoded credentials/secrets</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "step-2",
    title: "2. Upload File ke Server",
    content: (
      <div className="space-y-4">
        <p>Gunakan SCP (Secure Copy) atau SFTP (FileZilla) untuk mengupload file dari komputer lokal ke VPS.</p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="mb-2 text-gray-400"># Contoh upload folder 'dist' ke folder '/var/www/html' di server</div>
          <code className="text-green-400">scp -r ./dist/* root@ip-server:/var/www/html</code>
        </div>
        <p className="text-sm text-muted-foreground">Alternatif: Gunakan FileZilla, login dengan IP server, username `root`, port `22`.</p>
      </div>
    )
  },
  {
    id: "step-3",
    title: "3. Konfigurasi Web Server (Nginx)",
    content: (
      <div className="space-y-4">
        <p>Jika menggunakan Nginx (rekomendasi), buat konfigurasi server block.</p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="mb-2 text-gray-400"># Buat file config baru</div>
          <div className="mb-4 text-green-400">nano /etc/nginx/sites-available/my-website</div>
          
          <div className="mb-2 text-gray-400"># Isi file config (Basic)</div>
          <pre className="text-blue-300">
{`server {
    listen 80;
    server_name domain-anda.com;
    root /var/www/html;
    index index.html;
}`}
          </pre>
        </div>
        <p>Setelah itu, aktifkan config dengan symlink dan restart Nginx:</p>
         <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <code className="text-green-400">ln -s /etc/nginx/sites-available/my-website /etc/nginx/sites-enabled/ && systemctl restart nginx</code>
        </div>
      </div>
    )
  },
  {
    id: "step-4",
    title: "4. Verifikasi Deployment",
    content: (
      <div className="space-y-4">
        <p>Buka browser dan akses IP server atau domain Anda. Pastikan halaman muncul dengan benar.</p>
        <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800">
           <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} />
           <span>Jika halaman tampil, selamat! Anda berhasil melakukan deployment.</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">Jika error, cek logs: <code>tail -f /var/log/nginx/error.log</code></p>
      </div>
    )
  }
]

export default function DeployPage() {
  return (
    <>
      <Helmet>
        <title>Deploy Website - BelajarHosting</title>
        <meta name="description" content="Tutorial cara men-deploy website dan aplikasi ke VPS. Panduan upload file dan konfigurasi web server." />
      </Helmet>
      
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="absolute inset-0 bg-gray-50" />
          
          <div className="container relative mx-auto px-4 text-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
              <span className="text-sm font-medium text-primary">Tutorial Lanjutan</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6">
              Cara Deploy <span className="text-primary">Website & Aplikasi</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Langkah demi langkah men-deploy kode Anda dari local computer ke live server 
              sehingga bisa diakses oleh seluruh dunia.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border shadow-sm text-sm font-medium text-gray-700">
                <HugeiconsIcon icon={Upload02Icon} size={18} className="text-blue-500" />
                Upload File
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border shadow-sm text-sm font-medium text-gray-700">
                <HugeiconsIcon icon={Settings01Icon} size={18} className="text-orange-500" />
                Config Server
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border shadow-sm text-sm font-medium text-gray-700">
                <HugeiconsIcon icon={Globe02Icon} size={18} className="text-green-500" />
                Go Live
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Proses Deployment</h2>
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
               <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
               <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
               
               <div className="relative z-10">
                 <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ingin performa lebih baik?</h2>
                 <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                   Pelajari praktik terbaik (Best Practices) untuk keamanan server, optimasi kecepatan, dan backup rutin.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Link to="/edukasi/best-practices">
                     <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto">
                       Baca Best Practices <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2" size={16} />
                     </Button>
                   </Link>
                   <Link to="/docs">
                    <Button size="lg" className="bg-transparent border border-white text-white hover:bg-white/10 w-full sm:w-auto shadow-none">
                       Dokumentasi Lengkap
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
