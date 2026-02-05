
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import { HelpCircle, Mail, MessageCircle, Send } from "lucide-react"

export default function DashboardSupport() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>Bantuan - BelajarHosting</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          activePage="/dashboard/bantuan"
        />
        
        <div className="flex-1 lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
          <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />
          
          <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-8">
            
            {/* Header Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-full shrink-0">
                <HelpCircle size={32} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Support</h1>
                <p className="text-gray-500">Get help and support for your BelajarHosting services</p>
              </div>
            </div>

            {/* Support Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              
              {/* Email Support */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Email Support</h2>
                    <p className="text-sm text-gray-500">Send us an email for detailed assistance</p>
                  </div>
                </div>
                
                <div className="mb-6">
                   <p className="text-sm font-medium text-gray-700">Email: <span className="text-blue-600">belajarhosting.com@gmail.com</span></p>
                </div>
                
                <a href="mailto:belajarhosting.com@gmail.com" className="mt-auto">
                  <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    <Send size={16} />
                    Send Email
                  </button>
                </a>
              </div>

              {/* WhatsApp Support */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">WhatsApp Support</h2>
                    <p className="text-sm text-gray-500">Chat with us directly on WhatsApp</p>
                  </div>
                </div>
                
                <div className="mb-6">
                   <p className="text-sm font-medium text-gray-700">WhatsApp: <span className="text-green-600">+62 851-7309-0538</span></p>
                </div>
                
                <a href="https://wa.me/6285173090538" target="_blank" rel="noopener noreferrer" className="mt-auto">
                  <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    <MessageCircle size={16} />
                    Chat on WhatsApp
                  </button>
                </a>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-6 text-gray-700">
               <h3 className="font-bold text-gray-900 mb-4">Sebelum menghubungi support</h3>
               <ul className="space-y-2 text-sm list-disc pl-5">
                 <li>Harap sertakan ID layanan atau nama layanan Anda saat melaporkan masalah</li>
                 <li>Jelaskan masalah secara mendetail dengan langkah-langkah kejadian</li>
                 <li>Sertakan pesan error apa pun yang Anda lihat</li>
                 <li>Beri tahu kami apa yang sedang Anda coba lakukan</li>
               </ul>
            </div>
            
          </main>
        </div>
      </div>
    </>
  )
}
