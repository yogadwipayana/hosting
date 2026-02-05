import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

// Custom SVG Icons (Reused from LandingPages.jsx for consistency)
const GlobalIcon = () => <img src="/images/website-svgrepo-com.svg" alt="Website" className="h-6 w-6" />
const DatabaseIcon = () => <img src="/images/database-svgrepo-com.svg" alt="Database" className="h-6 w-6" />
const Robot01Icon = () => <img src="/images/bot-svgrepo-com.svg" alt="Bot" className="h-6 w-6" />
const LayersIcon = () => <img src="/images/coolify.svg" alt="Coolify" className="h-6 w-6" />
const CpuIcon = () => <img src="/images/bot-svgrepo-com.svg" alt="Bot API" className="h-6 w-6" />
const CommandIcon = () => <img src="/images/devops-svgrepo-com.svg" alt="DevOps" className="h-6 w-6" />
const N8nIcon = () => <img src="/images/n8n.svg" alt="n8n" className="h-6 w-6" />

const MainContent = () => {
  const classes = [
    {
      icon: GlobalIcon,
      title: "Deploy Website",
      description: "Pelajari cara deploy website statis dan dinamis menggunakan Vercel, Netlify, dan VPS.",
      count: "15 Tutorial",
      color: "bg-blue-100",
    },
    {
      icon: N8nIcon,
      title: "n8n Automation",
      description: "Setup n8n workflow automation di server sendiri. Integrasikan layanan tanpa batas.",
      count: "8 Tutorial",
      color: "bg-blue-100",
    },
    {
      icon: DatabaseIcon,
      title: "Database Management",
      description: "Deploy dan kelola PostgreSQL, MySQL, MongoDB, dan Redis dengan mudah.",
      count: "12 Tutorial",
      color: "bg-blue-100",
    },
    {
      icon: LayersIcon,
      title: "Self-Hosted DevOps",
      description: "Setup platform deployment seperti Coolify dan Dokploy di server sendiri.",
      count: "10 Tutorial",
      color: "bg-blue-100",
    },
    {
      icon: CpuIcon,
      title: "Bot Development",
      description: "Deploy bot Telegram, Discord, dan WhatsApp dengan webhook yang handal.",
      count: "7 Tutorial",
      color: "bg-blue-100",
    },
    {
      icon: CommandIcon,
      title: "Server Administration",
      description: "Panduan lengkap Docker, Nginx, SSL, dan keamanan server Linux.",
      count: "8 Tutorial",
      color: "bg-blue-100",
    },
  ]

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-sm font-medium text-primary">Materi Premium</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2">
          Kelas <span className="text-primary">Eksklusif</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Tingkatkan skill anda dengan mengikuti panduan terstruktur dari para expert.
        </p>
      </div>

      {/* Classes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((item) => (
          <Card key={item.title} className="group cursor-pointer border-0 shadow-sm hover:shadow-md transition-all bg-white">
            <CardHeader>
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${item.color} mb-4`}>
                <item.icon />
              </div>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-gray-900">{item.title}</CardTitle>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                  {item.count}
                </span>
              </div>
              <CardDescription className="text-base text-gray-500 mt-2">
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                Mulai Belajar
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}

export default function ClassDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>Kelas - Dashboard BelajarHosting</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          activePage="/dashboard/kelas"
        />
        
        <div className="flex-1 lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
          <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />
          <MainContent />
        </div>
      </div>
    </>
  )
}
