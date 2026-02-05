
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import { Mail, Save } from "lucide-react"

export default function DashboardSetting() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [emailMarketing, setEmailMarketing] = useState(false)

  return (
    <>
      <Helmet>
        <title>Pengaturan - BelajarHosting</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          activePage="/dashboard/pengaturan"
        />
        
        <div className="flex-1 lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
          <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />
          
          <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Pengaturan</h1>
            
            {/* Preferences Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm max-w-4xl">
              {/* Header */}
              <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-white rounded-t-lg">
                <Mail className="text-gray-400" size={20} />
                <h2 className="font-semibold text-gray-700">Email Marketing Preferences</h2>
              </div>
              
              {/* Body */}
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-900">Marketing Emails</h3>
                    <p className="text-sm text-gray-500">
                      Receive promotional emails, product updates, and special offers from BelajarHosting.
                    </p>
                  </div>
                  
                  {/* Switch Toggle */}
                  <button 
                    onClick={() => setEmailMarketing(!emailMarketing)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                      emailMarketing ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={emailMarketing}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        emailMarketing ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Footer Section (Divider & Button) */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                  <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                    <Save size={16} />
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
            
          </main>
        </div>
      </div>
    </>
  )
}
