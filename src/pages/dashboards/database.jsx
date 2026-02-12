
import { useState, useEffect } from "react"
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import { databaseApi } from "@/lib/api"
import {
  Database,
  Plus,
  MoreVertical,
  HardDrive,
  Cpu,
  Server,
  Activity,
  AlertCircle,
  Loader2,
  Trash2
} from "lucide-react"

const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-green-100 text-green-700",
    suspended: "bg-red-100 text-red-700",
    provisioning: "bg-blue-100 text-blue-700",
    maintenance: "bg-yellow-100 text-yellow-700",
    pending: "bg-gray-100 text-gray-700",
    expired: "bg-red-100 text-red-700"
  }

  const labels = {
    active: "Active",
    suspended: "Suspended",
    provisioning: "Provisioning",
    maintenance: "Maintenance",
    pending: "Pending",
    expired: "Expired"
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles.pending}`}>
      {labels[status] || status}
    </span>
  )
}

const MainContent = () => {
  const [databases, setDatabases] = useState([])
  const [stats, setStats] = useState({
    totalDatabases: 0,
    activeDatabases: 0,
    issues: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    fetchDatabases()
  }, [])

  const fetchDatabases = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await databaseApi.getDatabases()

      if (response.status === 'success') {
        setDatabases(response.data.databases || [])
        setStats(response.data.stats || {
          totalDatabases: 0,
          activeDatabases: 0,
          issues: 0
        })
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch databases')
      console.error('Error fetching databases:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this database?')) {
      return
    }

    try {
      setDeletingId(id)
      await databaseApi.deleteDatabase(id)
      // Refresh the list
      fetchDatabases()
    } catch (err) {
      alert(err.message || 'Failed to delete database')
      console.error('Error deleting database:', err)
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-500">Loading databases...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl border border-red-100 shadow-sm max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Databases</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={fetchDatabases}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Database</h1>
          <p className="text-gray-500">Kelola layanan database managed solutions Anda</p>
        </div>
        <Link to="/dashboard/database/deploy" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Plus size={18} />
          <span>Deploy Database Baru</span>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Database</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Database size={20} />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">{stats.totalDatabases}</span>
            <span className="text-green-600 text-xs font-medium mb-1">+0 bulan ini</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Active Services</h3>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <Activity size={20} />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {stats.activeDatabases}
            </span>
            <span className="text-gray-400 text-xs font-medium mb-1">services</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Issues</h3>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <AlertCircle size={20} />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">{stats.issues}</span>
            <span className="text-green-600 text-xs font-medium mb-1">All systems normal</span>
          </div>
        </div>
      </div>

      {/* List Content */}
      <div className="space-y-6">
        {databases.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Database size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Databases Yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Anda belum memiliki database. Deploy database baru untuk memulai.
            </p>
            <Link
              to="/dashboard/database/deploy"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <Plus size={18} />
              <span>Deploy Database Baru</span>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {databases.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
                    {/* Service Info */}
                    <div className="flex items-start gap-4">
                      <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 p-2">
                        {service.icon ? (
                           <img src={service.icon} alt={service.engine} className="w-full h-full object-contain" />
                        ) : (
                           <Database size={24} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                          <StatusBadge status={service.status} />
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5">
                            {service.engine} {service.version}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span>{service.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                      <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 h-9 bg-white border border-gray-200 text-gray-700 rounded-md text-xs font-bold uppercase hover:bg-gray-50 transition-colors shadow-sm">
                        Cek
                      </button>
                      <Link to={`/dashboard/database/manage/${service.id}`} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 h-9 bg-blue-600 text-white rounded-md text-xs font-bold uppercase hover:bg-blue-700 transition-colors shadow-sm bg-opacity-90">
                        Kelola
                      </Link>
                      <button
                        onClick={() => handleDelete(service.id)}
                        disabled={deletingId === service.id}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                        title="Delete database"
                      >
                        {deletingId === service.id ? (
                          <Loader2 size={20} className="animate-spin" />
                        ) : (
                          <Trash2 size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* divider */}
                  <div className="h-px bg-gray-100 w-full mb-6"></div>

                  {/* Resources */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                     <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                          <Server size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-0.5">Plan Type</p>
                          <p className="text-sm font-medium text-gray-900">{service.plan}</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-purple-50 text-purple-600">
                          <Cpu size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-0.5">Resources</p>
                          <p className="text-sm font-medium text-gray-900">{service.cpu} / {service.ram}</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-orange-50 text-orange-600">
                          <HardDrive size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-0.5">Storage</p>
                          <p className="text-sm font-medium text-gray-900">{service.storage}</p>
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

export default function DatabaseDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>Database Dashboard - BelajarHosting</title>
      </Helmet>

      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activePage="/dashboard/database"
        />

        <div className="flex-1 lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
          <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />
          <MainContent />
        </div>
      </div>
    </>
  )
}
