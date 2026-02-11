import React, { useState, useEffect } from "react"
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import {
  Server,
  Globe,
  Cpu,
  HardDrive,
  MoreVertical,
  ExternalLink,
  Plus,
  RefreshCw,
  Power,
  Loader2
} from "lucide-react"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import { useHosting } from "@/hooks/useHosting"

const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-green-100 text-green-700",
    suspended: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
    expired: "bg-gray-100 text-gray-700"
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status] || styles.active}`}>
      {status}
    </span>
  )
}

const UsageBar = ({ label, percentage, color = "bg-blue-600" }) => (
  <div className="w-full">
    <div className="flex justify-between mb-1">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-xs font-medium text-gray-700">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-1.5">
      <div className={`${color} h-1.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
)

const MainContent = () => {
  const [activeTab, setActiveTab] = useState("hosting")
  const { hostings, stats, loading, error, fetchHostings, deleteHosting } = useHosting()

  // Fetch hostings on mount
  useEffect(() => {
    fetchHostings()
  }, [fetchHostings])

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this hosting?')) return
    try {
      await deleteHosting(id)
    } catch {
      // Error is handled in hook
    }
  }

  // Format date to Indonesian format
  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  // Mock user domains (until domain API is implemented)
  const userDomains = [
    {
      id: 1,
      name: "belajar-react.com",
      status: "active",
      expiryDate: "12 Des 2024",
      autoRenew: true,
      registrar: "DockPloy"
    },
  ]

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Hosting</h1>
          <p className="text-gray-500">Kelola layanan hosting dan domain server Anda</p>
        </div>
        <div className="flex gap-3">
          <Link to="/dashboard/domain/buy" className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Globe size={18} />
            <span>Beli Domain Baru</span>
          </Link>
          <Link to="/dashboard/hosting/deploy" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Plus size={18} />
            <span>Deploy Hosting Baru</span>
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
              <p className="text-sm text-gray-500 font-medium">Total Layanan</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {loading ? '-' : (stats?.totalServices || 0)}
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg text-green-600">
              <Power size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Server Aktif</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {loading ? '-' : (stats?.activeServices || 0)}
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
              <Globe size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Domain Terhubung</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {loading ? '-' : (stats?.connectedDomains || 0)}
              </h3>
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
              <h3 className="text-2xl font-bold text-gray-900">
                {loading ? '-' : (stats?.expiringSoon || 0)}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("hosting")}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === "hosting"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Hosting Services
        </button>
        <button
          onClick={() => setActiveTab("domain")}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === "domain"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          My Domains
        </button>
      </div>

      {/* List Content */}
      <div className="space-y-6">

        {activeTab === "hosting" ? (
          <div className="grid gap-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : hostings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <Server className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada hosting</h3>
                <p className="text-gray-500 mb-4">Deploy hosting pertama Anda untuk memulai</p>
                <Link
                  to="/dashboard/hosting/deploy"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <Plus size={18} />
                  Deploy Hosting
                </Link>
              </div>
            ) : (
              hostings.map((service) => (
                <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
                      {/* Service Info */}
                      <div className="flex items-start gap-4">
                        <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                          <HardDrive size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-bold text-gray-900">{service.domain}</h3>
                            <StatusBadge status={service.status} />
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{service.location}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>Exp: {formatDate(service.expiryDate)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 w-full lg:w-auto">
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 h-9 bg-white border border-gray-200 text-red-600 hover:bg-red-50 rounded-md text-xs font-bold uppercase transition-colors shadow-sm"
                        >
                          Hapus
                        </button>
                        <Link to={`/dashboard/hosting/manage?id=${service.id}`} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 h-9 bg-blue-600 text-white rounded-md text-xs font-bold uppercase hover:bg-blue-700 transition-colors shadow-sm bg-opacity-90">
                          Kelola
                        </Link>
                      </div>
                    </div>

                    {/* divider */}
                    <div className="h-px bg-gray-100 w-full mb-6"></div>

                    {/* Resources */}
                    <div className="flex items-center gap-6">
                       <div className="flex items-center gap-3">
                          <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                            <Cpu size={18} />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-0.5">Plan Type</p>
                            <p className="text-sm font-medium text-gray-900">{service.plan}</p>
                          </div>
                       </div>
                       <div className="hidden sm:block w-px h-8 bg-gray-200"></div>
                       <div className="hidden sm:flex items-center gap-3 flex-1 max-w-xs">
                          <UsageBar
                            label="Disk Usage"
                            percentage={service.diskUsage?.percentage || 0}
                            color="bg-purple-600"
                          />
                       </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="grid gap-6">
            {userDomains.map((domain) => (
              <div key={domain.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
                    {/* Domain Info */}
                    <div className="flex items-start gap-4">
                      <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                        <Globe size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{domain.name}</h3>
                          <StatusBadge status={domain.status} />
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Exp: {domain.expiryDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                      <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 h-9 bg-white border border-gray-200 text-gray-700 rounded-md text-xs font-bold uppercase hover:bg-gray-50 transition-colors shadow-sm">
                        DNS
                      </button>
                      <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 h-9 bg-white border border-gray-200 text-gray-700 rounded-md text-xs font-bold uppercase hover:bg-gray-50 transition-colors shadow-sm">
                        Cek
                      </button>
                      <Link to="/dashboard/hosting/domain" className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 h-9 bg-blue-600 text-white rounded-md text-xs font-bold uppercase hover:bg-blue-700 transition-colors shadow-sm bg-opacity-90">
                        Kelola
                      </Link>
                    </div>
                  </div>

                  {/* divider */}
                  <div className="h-px bg-gray-100 w-full mb-6"></div>

                  {/* Info */}
                  <div className="flex items-center gap-6">
                     <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-orange-50 text-orange-600">
                          <RefreshCw size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-0.5">Auto Renewal</p>
                          <p className="text-sm font-medium text-gray-900">
                            {domain.autoRenew ? "Enabled" : "Disabled"}
                          </p>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default function DashboardHosting() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>Manage Hosting - Dashboard</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <DashboardSidebar
          activeMenuItem="hosting"
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
