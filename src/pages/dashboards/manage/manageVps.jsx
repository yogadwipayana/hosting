import React, { useState } from "react"
import { useNavigate } from "react-router"
import { Helmet } from "react-helmet-async"
import { 
  Server, 
  Cpu, 
  HardDrive, 
  MemoryStick,
  Globe,
  Power,
  RefreshCw,
  Terminal,
  Settings,
  Trash2,
  ArrowLeft,
  Activity,
  Clock,
  Shield
} from "lucide-react"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"

// Mock VPS Data
const vpsData = {
  id: 1,
  name: "Production Server",
  ip: "103.56.148.101",
  plan: "KVM 2",
  status: "active",
  os: "Ubuntu 22.04 LTS",
  expiryDate: "12 Des 2024",
  createdAt: "12 Des 2023",
  specs: { cpu: "2 vCPU", ram: "2 GB", storage: "40 GB NVMe", bandwidth: "2 TB" },
  hostname: "prod-server-01",
  location: "Jakarta, Indonesia"
}

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

const ActionButton = ({ icon: Icon, label, variant = "default", onClick }) => {
  const variants = {
    default: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100",
    warning: "bg-orange-50 border border-orange-200 text-orange-600 hover:bg-orange-100"
  }
  
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm ${variants[variant]}`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  )
}

const InfoCard = ({ icon: Icon, label, value, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600"
  }
  
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-sm font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

const MainContent = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-8">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Kembali
      </button>

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <Server size={28} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">{vpsData.name}</h1>
              <StatusBadge status={vpsData.status} />
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span>{vpsData.ip}</span>
              <span>•</span>
              <span>{vpsData.os}</span>
              <span>•</span>
              <span>{vpsData.location}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <ActionButton icon={Terminal} label="Console" />
          <ActionButton icon={RefreshCw} label="Restart" variant="warning" />
          <ActionButton icon={Power} label="Power Off" variant="danger" />
        </div>
      </div>

      {/* Specs Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <InfoCard icon={Cpu} label="CPU" value={vpsData.specs.cpu} color="blue" />
        <InfoCard icon={MemoryStick} label="RAM" value={vpsData.specs.ram} color="purple" />
        <InfoCard icon={HardDrive} label="Storage" value={vpsData.specs.storage} color="orange" />
        <InfoCard icon={Globe} label="Bandwidth" value={vpsData.specs.bandwidth} color="green" />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
        {[
          { id: "overview", label: "Overview" },
          { id: "network", label: "Network" },
          { id: "backups", label: "Backups" },
          { id: "settings", label: "Pengaturan" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.id 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Server Details */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Detail Server</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Hostname</span>
                    <span className="text-sm font-medium text-gray-900">{vpsData.hostname}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">IP Address</span>
                    <span className="text-sm font-medium text-gray-900">{vpsData.ip}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Operating System</span>
                    <span className="text-sm font-medium text-gray-900">{vpsData.os}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Plan</span>
                    <span className="text-sm font-medium text-gray-900">{vpsData.plan}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Location</span>
                    <span className="text-sm font-medium text-gray-900">{vpsData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Dibuat</span>
                    <span className="text-sm font-medium text-gray-900">{vpsData.createdAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Berakhir</span>
                    <span className="text-sm font-medium text-gray-900">{vpsData.expiryDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Status</span>
                    <StatusBadge status={vpsData.status} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Aksi Cepat</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Terminal size={24} className="text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Web Console</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Activity size={24} className="text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Monitoring</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Shield size={24} className="text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Firewall</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Clock size={24} className="text-orange-600" />
                  <span className="text-sm font-medium text-gray-700">Snapshots</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "network" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Konfigurasi Network</h3>
          <p className="text-gray-500 text-sm">Fitur network akan segera tersedia.</p>
        </div>
      )}

      {activeTab === "backups" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Backup & Snapshots</h3>
          <p className="text-gray-500 text-sm">Fitur backup akan segera tersedia.</p>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Pengaturan VPS</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
              <div>
                <h4 className="font-medium text-gray-900">Reinstall OS</h4>
                <p className="text-sm text-gray-500">Install ulang sistem operasi (data akan dihapus)</p>
              </div>
              <button className="px-4 py-2 bg-orange-50 text-orange-600 border border-orange-200 rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors">
                Reinstall
              </button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border border-red-200 bg-red-50/50">
              <div>
                <h4 className="font-medium text-red-900">Hapus VPS</h4>
                <p className="text-sm text-red-600">Hapus VPS secara permanen (tidak dapat dikembalikan)</p>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2">
                <Trash2 size={16} />
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default function ManageVps() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>Kelola VPS - Dashboard</title>
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
