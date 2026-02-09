import React, { useState } from "react"
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { 
  Server, 
  Cpu, 
  HardDrive, 
  MoreVertical, 
  Plus,
  RefreshCw,
  Power,
  MemoryStick,
  Globe
} from "lucide-react"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"

// Mock Data for VPS Services
const vpsServices = [
  {
    id: 1,
    name: "Production Server",
    ip: "103.56.148.101",
    plan: "KVM 2",
    status: "active",
    os: "Ubuntu 22.04",
    expiryDate: "12 Des 2024",
    specs: { cpu: "2 vCPU", ram: "2 GB", storage: "40 GB" },
  },
  {
    id: 2,
    name: "Development Server",
    ip: "103.56.148.102",
    plan: "KVM 1",
    status: "active",
    os: "Debian 12",
    expiryDate: "25 Jan 2025",
    specs: { cpu: "1 vCPU", ram: "1 GB", storage: "20 GB" },
  },
  {
    id: 3,
    name: "Test Server",
    ip: "103.56.148.103",
    plan: "KVM 1",
    status: "suspended",
    os: "CentOS 8",
    expiryDate: "01 Feb 2024",
    specs: { cpu: "1 vCPU", ram: "1 GB", storage: "20 GB" },
  }
]

const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-green-100 text-green-700",
    suspended: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700"
  }
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status] || styles.active}`}>
      {status}
    </span>
  )
}

const MainContent = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage VPS</h1>
          <p className="text-gray-500">Kelola Virtual Private Server Anda</p>
        </div>
        <div className="flex gap-3">
          <Link to="/dashboard/vps/deploy" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Plus size={18} />
            <span>Deploy VPS Baru</span>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <Server size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total VPS</p>
              <h3 className="text-2xl font-bold text-gray-900">3</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg text-green-600">
              <Power size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">VPS Aktif</p>
              <h3 className="text-2xl font-bold text-gray-900">2</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
              <Cpu size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total vCPU</p>
              <h3 className="text-2xl font-bold text-gray-900">4</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
              <RefreshCw size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Perlu Perpanjang</p>
              <h3 className="text-2xl font-bold text-gray-900">1</h3>
            </div>
          </div>
        </div>
      </div>

      {/* VPS List */}
      <div className="space-y-6">
        <div className="grid gap-6">
          {vpsServices.map((vps) => (
            <div key={vps.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
                  {/* VPS Info */}
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                      <Server size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">{vps.name}</h3>
                        <StatusBadge status={vps.status} />
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{vps.ip}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{vps.os}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Exp: {vps.expiryDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full lg:w-auto">
                    <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 h-9 bg-white border border-gray-200 text-gray-700 rounded-md text-xs font-bold uppercase hover:bg-gray-50 transition-colors shadow-sm">
                      Console
                    </button>
                    <Link to="/dashboard/vps/manage" className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 h-9 bg-blue-600 text-white rounded-md text-xs font-bold uppercase hover:bg-blue-700 transition-colors shadow-sm bg-opacity-90">
                      Kelola
                    </Link>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md lg:hidden">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>

                {/* divider */}
                <div className="h-px bg-gray-100 w-full mb-6"></div>

                {/* Specs */}
                <div className="flex flex-wrap items-center gap-6">
                   <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                        <Cpu size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">CPU</p>
                        <p className="text-sm font-medium text-gray-900">{vps.specs.cpu}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-purple-50 text-purple-600">
                        <MemoryStick size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">RAM</p>
                        <p className="text-sm font-medium text-gray-900">{vps.specs.ram}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-orange-50 text-orange-600">
                        <HardDrive size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Storage</p>
                        <p className="text-sm font-medium text-gray-900">{vps.specs.storage}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-green-50 text-green-600">
                        <Globe size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Plan</p>
                        <p className="text-sm font-medium text-gray-900">{vps.plan}</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default function DashboardVps() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>Manage VPS - Dashboard</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <DashboardSidebar 
          activeMenuItem="vps" 
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
