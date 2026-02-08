
import { useState } from "react"
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import { 
  Database, 
  Plus, 
  MoreVertical, 
  HardDrive,
  Cpu,
  Server,
  Activity,
  AlertCircle
} from "lucide-react"
// Mock Data
const databaseServices = [
  {
    id: 1,
    name: "production-db-01",
    engine: "PostgreSQL",
    icon: "/images/postgres.svg",
    version: "15.4",
    plan: "Standard",
    status: "active",
    location: "Jakarta (ID)",
    storage: "15 GB",
    cpu: "1 vCPU",
    ram: "1 GB"
  },
  {
    id: 2,
    name: "wordpress-mysql",
    engine: "MySQL",
    icon: "/images/mysql.svg",
    version: "8.0",
    plan: "Basic",
    status: "active",
    location: "Jakarta (ID)",
    storage: "5 GB",
    cpu: "0.5 vCPU",
    ram: "0.5 GB"
  }
]

const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-green-100 text-green-700",
    suspended: "bg-red-100 text-red-700",
    provisioning: "bg-blue-100 text-blue-700",
    maintenance: "bg-yellow-100 text-yellow-700"
  }

  const labels = {
    active: "Active",
    suspended: "Suspended",
    provisioning: "Provisioning",
    maintenance: "Maintenance"
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

const MainContent = () => {
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
            <span className="text-3xl font-bold text-gray-900">{databaseServices.length}</span>
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
              {databaseServices.filter(s => s.status === 'active').length}
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
            <span className="text-3xl font-bold text-gray-900">0</span>
            <span className="text-green-600 text-xs font-medium mb-1">All systems normal</span>
          </div>
        </div>
      </div>

      {/* List Content */}
      <div className="space-y-6">
        <div className="grid gap-6">
          {databaseServices.map((service) => (
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
                    <Link to="/dashboard/database/manage" className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 h-9 bg-blue-600 text-white rounded-md text-xs font-bold uppercase hover:bg-blue-700 transition-colors shadow-sm bg-opacity-90">
                      Kelola
                    </Link>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md lg:hidden">
                      <MoreVertical size={20} />
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
