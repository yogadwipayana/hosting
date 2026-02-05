import React, { useState } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router"
import {
  Video,
} from "lucide-react"

import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"

// Main Content Component
const MainContent = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Learn</h1>
        <p className="text-gray-500">Expand your skills with webinars and online courses</p>
      </div>

      <div className="mb-10">
        <h2 className="mb-6 text-lg font-semibold text-gray-900">Upcoming Live Webinar</h2>
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl bg-white p-8 text-center shadow-sm">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Video className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No webinars available</h3>
          <p className="text-gray-500">Check back later for upcoming live webinars.</p>
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-lg font-semibold text-gray-900">Online Courses</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Sample Course Card */}
          <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="relative h-48 bg-linear-to-br from-blue-50 to-blue-100 p-6 flex items-end">
                <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-blue-500/20 blur-xl"></div>
                 <h3 className="text-2xl font-bold text-blue-600">Webinar</h3>
            </div>
          </div>
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
        <title>Dashboard - Learn</title>
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
