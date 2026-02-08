import React, { useState } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router"
import { 
  Video, 
  BookOpen, 
  PlayCircle, 
  Calendar, 
  Clock,
  Search,
  ArrowRight
} from "lucide-react"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

// Main Content Component
const MainContent = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-6 lg:p-8">
       {/* Header with Search */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Pusat Pembelajaran</h1>
            <p className="text-gray-500 mt-1">Tingkatkan skill deployment dan hosting anda.</p>
          </div>
          <div className="relative w-full md:w-80">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
               <Search size={18} />
            </div>
            <Input 
              placeholder="Cari tutorial & webinar..." 
              className="pl-10 h-11 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl shadow-sm"
            />
          </div>
       </div>

       {/* Upcoming Webinar Section */}
       <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="text-blue-600" size={20} />
              Live Webinar
            </h2>
          </div>
          
          <Card className="border-dashed border-2 border-gray-200 bg-gray-50/50 shadow-none rounded-xl">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border border-gray-100">
                <Video className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada webinar aktif</h3>
              <p className="text-gray-500 max-w-sm mx-auto text-sm">
                 Jadwal webinar terbaru akan muncul di sini. Pantau terus untuk mendapatkan update seputar teknologi hosting terbaru.
              </p>
              <Button variant="outline" className="mt-6 rounded-lg border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-white">
                Lihat Jadwal Arcip
              </Button>
            </CardContent>
          </Card>
       </div>

       {/* Online Courses Section */}
       <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="text-purple-600" size={20} />
              Kursus & Tutorial
            </h2>
            <Link to="/edukasi" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline flex items-center">
              Lihat Semua <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
             {/* Card 1: Webinar Recording */}
             <Card className="group cursor-pointer border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300 bg-white rounded-xl overflow-hidden h-full flex flex-col">
                <div className="relative h-48 bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden">
                   {/* Abstract background shapes */}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                   <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-5 -mb-5"></div>
                   
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-14 w-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <PlayCircle className="h-8 w-8 text-white fill-white/20" />
                      </div>
                   </div>
                   
                   <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[10px] font-medium text-white flex items-center">
                      <Clock size={10} className="mr-1" /> 1j 30m
                   </div>
                </div>
                
                <CardContent className="p-5 flex-1 flex flex-col">
                   <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold uppercase tracking-wider">
                        Hosting
                      </span>
                   </div>
                   
                   <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                      Basic Hosting & Deployment
                   </h3>
                   <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      Pelajari cara deploy website statis dan dinamis ke berbagai platform cloud hosting.
                   </p>
                   
                   <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                            AD
                         </div>
                         <span className="text-xs font-medium text-gray-600">Admin</span>
                      </div>
                      <span className="text-xs font-medium text-blue-600 flex items-center">
                         Mulai <ArrowRight size={12} className="ml-1" />
                      </span>
                   </div>
                </CardContent>
             </Card>
             
             {/* Card 2: Docker */}
             <Card className="group cursor-pointer border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300 bg-white rounded-xl overflow-hidden h-full flex flex-col">
                <div className="relative h-48 bg-gradient-to-br from-cyan-500 to-blue-500 overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                   
                   <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-white/90 group-hover:scale-110 transition-transform duration-300" />
                   </div>
                   
                   <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[10px] font-medium text-white flex items-center">
                      <Clock size={10} className="mr-1" /> 45m
                   </div>
                </div>
                
                <CardContent className="p-5 flex-1 flex flex-col">
                   <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-600 text-[11px] font-bold uppercase tracking-wider">
                        Docker
                      </span>
                   </div>
                   
                   <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-cyan-600 transition-colors">
                      Pengenalan Docker Container
                   </h3>
                   <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      Memahami konsep container dan cara membuat Dockerfile untuk aplikasi Node.js.
                   </p>
                   
                   <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <div className="h-6 w-6 rounded-full bg-cyan-100 flex items-center justify-center text-[10px] font-bold text-cyan-600">
                            DV
                         </div>
                         <span className="text-xs font-medium text-gray-600">DevOps Team</span>
                      </div>
                      <span className="text-xs font-medium text-cyan-600 flex items-center">
                         Mulai <ArrowRight size={12} className="ml-1" />
                      </span>
                   </div>
                </CardContent>
             </Card>

             {/* Card 3: Database */}
             <Card className="group cursor-pointer border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300 bg-white rounded-xl overflow-hidden h-full flex flex-col">
                <div className="relative h-48 bg-gradient-to-br from-emerald-500 to-teal-600 overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                   
                   <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-white/90 group-hover:scale-110 transition-transform duration-300" />
                   </div>
                   
                   <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[10px] font-medium text-white flex items-center">
                      <Clock size={10} className="mr-1" /> 50m
                   </div>
                </div>
                
                <CardContent className="p-5 flex-1 flex flex-col">
                   <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold uppercase tracking-wider">
                        Database
                      </span>
                   </div>
                   
                   <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-emerald-600 transition-colors">
                      Managed Database PostgreSQL
                   </h3>
                   <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      Panduan setup dan optimasi PostgreSQL menggunakan layanan managed database.
                   </p>
                   
                   <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-600">
                            DB
                         </div>
                         <span className="text-xs font-medium text-gray-600">DB Admin</span>
                      </div>
                      <span className="text-xs font-medium text-emerald-600 flex items-center">
                         Mulai <ArrowRight size={12} className="ml-1" />
                      </span>
                   </div>
                </CardContent>
             </Card>
          </div>
       </div>
    </main>
  )
}

// Layout Wrapper
export default function DashboardOverview() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>Dashboard - Pusat Pembelajaran</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <DashboardSidebar 
          activeMenuItem="ringkasan" 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="lg:pl-64 transition-all duration-300">
          <DashboardTopbar 
            userName="User" 
            userEmail="yogadwipayana2006@gmail.com"
            onMenuClick={() => setIsSidebarOpen(true)}
          />
          <MainContent />
        </div>
      </div>
    </>
  )
}
