import React, { useState } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router"
import {
  Folder,
  Cloud,
  Server,
  Database,
  Zap,
  GraduationCap,
  Bookmark,
  ArrowRight,
  Plus,
  Activity,
  AlertCircle,
  CheckCircle,
  ExternalLink
} from "lucide-react"

import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"

// --- Mock Data (Aggregated from other pages) ---

const projects = [
  { id: 1, status: "production" },
  { id: 2, status: "production" },
  { id: 3, status: "failed" }
]

const hostingServices = [
  { id: 1, status: "active" },
  { id: 2, status: "active" },
  { id: 3, status: "suspended" }
]

const vpsServices = [
  { id: 1, status: "active" },
  { id: 2, status: "active" },
  { id: 3, status: "suspended" }
]

const databaseServices = [
  { id: 1, status: "active" },
  { id: 2, status: "active" }
]

const automationServices = [
  { id: 1, status: "active" },
  { id: 2, status: "active" }
]

const classes = [
  { title: "React", progress: 0 },
  { title: "Node.js", progress: 0 }
]

const bookmarks = [
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }
]

// --- Components ---

const StatCard = ({ title, count, icon: Icon, subtext, link }) => (
  <Link to={link || "#"} className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="mt-2 text-3xl font-bold text-gray-900">{count}</h3>
      </div>
      <div className="rounded-xl p-3 bg-gray-50 text-gray-900">
        <Icon className="h-6 w-6" />
      </div>
    </div>
    {subtext && (
       <div className="mt-4 flex items-center text-sm">
          {subtext}
       </div>
    )}
    <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-transparent via-gray-100 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
  </Link>
)

const SectionHeader = ({ title, link, linkText }) => (
    <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {link && (
            <Link to={link} className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline">
                {linkText || "View All"}
                <ArrowRight size={16} />
            </Link>
        )}
    </div>
)

const QuickAction = ({ icon: Icon, label, to }) => (
    <Link
        to={to}
        className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm transition-all group"
    >
        <div className="p-3 rounded-full bg-gray-50 text-gray-900 mb-3 group-hover:scale-110 transition-transform">
            <Icon className="h-6 w-6" />
        </div>
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{label}</span>
    </Link>
)

// Main Content Component
const MainContent = () => {
    // Derived Stats
    const activeProjects = projects.filter(p => p.status === 'production').length;
    const failedProjects = projects.filter(p => p.status === 'failed').length;
    const activeHosting = hostingServices.filter(h => h.status === 'active').length;

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50/50 p-6 lg:p-10">

      {/* Welcome Section */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Selamat Datang, User! 👋
        </h1>
        <p className="mt-2 text-gray-500 max-w-2xl">
            Ini adalah pusat kontrol anda. Pantau semua project, server, dan resource belajar anda dalam satu tampilan.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
            title="Total Projects"
            count={projects.length}
            icon={Folder}
            link="/dashboard/proyek"
            subtext={
                <span className="text-green-600 flex items-center gap-1 font-medium bg-green-50 px-2 py-0.5 rounded-full text-xs">
                    <CheckCircle size={12} /> {activeProjects} Active
                </span>
            }
        />
        <StatCard
            title="Hosting & Domain"
            count={hostingServices.length}
            icon={Cloud}
            link="/dashboard/hosting"
            subtext={
                <span className="text-blue-600 flex items-center gap-1 font-medium bg-blue-50 px-2 py-0.5 rounded-full text-xs">
                    <Activity size={12} /> {activeHosting} Online
                </span>
            }
        />
        <StatCard
            title="Active VPS"
            count={vpsServices.filter(v => v.status === 'active').length}
            icon={Server}
            link="/dashboard/vps"
             subtext={
                <span className="text-gray-500 font-medium text-xs">
                   Running {vpsServices.length} Total
                </span>
            }
        />
        <StatCard
            title="My Bookmarks"
            count={bookmarks.length}
            icon={Bookmark}
            link="/dashboard/bookmark"
             subtext={
                <span className="text-gray-500 font-medium text-xs">
                   Saved Resources
                </span>
            }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Main Activity Column */}
        <div className="lg:col-span-2 space-y-8">

            {/* Database & Automation Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-50 text-gray-900 rounded-lg">
                                <Database size={20} />
                            </div>
                            <h3 className="font-semibold text-gray-900">Databases</h3>
                        </div>
                        <Link to="/dashboard/database" className="text-sm text-blue-600 hover:underline">Manage</Link>
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-2xl font-bold text-gray-900">{databaseServices.length}</span>
                        <span className="text-sm text-gray-500">instances</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                        <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <p className="text-xs text-green-600 font-medium">All systems operational</p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-50 text-gray-900 rounded-lg">
                                <Zap size={20} />
                            </div>
                            <h3 className="font-semibold text-gray-900">Automation</h3>
                        </div>
                        <Link to="/dashboard/automation" className="text-sm text-blue-600 hover:underline">Manage</Link>
                    </div>
                     <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-2xl font-bold text-gray-900">{automationServices.length}</span>
                        <span className="text-sm text-gray-500">workflows</span>
                    </div>
                     <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                        <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500">Running smoothly</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <SectionHeader title="Quick Actions" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <QuickAction icon={Plus} label="New Project" to="/dashboard/project/new" />
                    <QuickAction icon={Cloud} label="Deploy Hosting" to="/dashboard/hosting/deploy" />
                    <QuickAction icon={Server} label="Deploy VPS" to="/dashboard/vps/deploy" />
                    <QuickAction icon={Database} label="Add Database" to="/dashboard/database/deploy" />
                </div>
            </div>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
             {/* System Health / Alerts */}
            <div className="rounded-xl border border-red-100 bg-red-50/50 p-6">
                 <div className="flex items-start gap-3">
                    <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
                    <div>
                        <h4 className="font-semibold text-red-900 mb-1">Attention Needed</h4>
                         <p className="text-sm text-red-700 mb-3">
                            You have {failedProjects} failed deployment(s) in your projects.
                        </p>
                        <Link to="/dashboard/proyek" className="text-sm font-medium text-red-700 hover:text-red-900 hover:underline">
                            Check Projects &rarr;
                        </Link>
                    </div>
                 </div>
            </div>

             {/* Learning Progress */}
             <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <SectionHeader title="Learning Progress" link="/dashboard/kelas" />
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-50 text-gray-900 rounded-lg">
                            <GraduationCap size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Fullstack Web Dev</p>
                            <p className="text-xs text-gray-500">0% Completed</p>
                        </div>
                         <Link to="/dashboard/kelas" className="text-xs font-medium text-blue-600 hover:underline">
                            Start
                         </Link>
                    </div>
                    <div className="h-px bg-gray-100" />
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <p className="text-sm text-blue-800 font-medium mb-1">More Classes Available</p>
                        <Link to="/dashboard/kelas" className="text-xs text-blue-600 hover:underline">Browse Catalog</Link>
                    </div>
                </div>
            </div>

            {/* Bookmarks Preview */}
             <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <SectionHeader title="Recent Bookmarks" link="/dashboard/bookmark" />
                <ul className="space-y-3">
                    {bookmarks.slice(0, 3).map((item, idx) => (
                         <li key={idx} className="flex items-center gap-3 text-sm text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                            <Bookmark size={16} className="text-gray-400" />
                            <span className="truncate flex-1">Bookmark Item {item.id}</span>
                            <ExternalLink size={14} className="text-gray-400" />
                        </li>
                    ))}
                </ul>
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
        <title>Dashboard Overview - BelajarHosting</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <DashboardSidebar
          activeMenuItem="ringkasan"
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="lg:pl-64 transition-all duration-300">
          <DashboardTopbar
            onMenuClick={() => setIsSidebarOpen(true)}
          />
          <MainContent />
        </div>
      </div>
    </>
  )
}
