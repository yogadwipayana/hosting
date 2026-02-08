import React, { useState } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import {
  Database,
  Server,
  Activity,
  HardDrive,
  Cpu,
  Key,
  Terminal,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Shield,
  Download,
  Users,
  Settings,
  MoreVertical,
  Power,
  RotateCcw,
  Copy,
  Eye,
  EyeOff,
  AlertCircle
} from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardTopbar } from "@/components/DashboardTopbar";

// Mock Data for a specific database service
const dbData = {
  id: 1,
  name: "production-db-01",
  engine: "PostgreSQL",
  icon: "/images/postgres.svg",
  version: "15.4",
  plan: "Standard",
  status: "aktif",
  location: "Jakarta (ID)",
  connection: {
    host: "db-prod-01.dockploy.com",
    port: "5432",
    database: "app_production",
    username: "doadmin",
    password: "secure_password_123" // In real app, this would be hidden
  },
  resources: {
    cpu: "1 vCPU",
    ram: "1 GB",
    storage: {
      used: 15,
      total: 50,
      unit: "GB",
      percentage: 30
    },
    connections: {
        active: 45,
        max: 100,
        percentage: 45
    }
  },
  backups: {
    lastBackup: "2 jam yang lalu",
    retention: "7 hari"
  },
  metrics: {
      cpuUsage: 12, // percentage
      memoryUsage: 45 // percentage
  }
};

const StatusBadge = ({ status }) => {
  const styles = {
    aktif: "bg-green-100 text-green-700",
    suspended: "bg-red-100 text-red-700",
    provisioning: "bg-blue-100 text-blue-700",
    maintenance: "bg-yellow-100 text-yellow-700"
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
        styles[status] || styles.aktif
      }`}
    >
      {status}
    </span>
  );
};

const ConnectionString = ({ connection, engine }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [copied, setCopied] = useState(false);
    
    // Construct connection string based on engine
    const protocol = engine.toLowerCase().includes('postgres') ? 'postgresql' : 'mysql';
    const connectionString = `${protocol}://${connection.username}:${connection.password}@${connection.host}:${connection.port}/${connection.database}`;
    
    // Display string with masked password
    const displayString = showPassword 
        ? connectionString 
        : `${protocol}://${connection.username}:••••••••@${connection.host}:${connection.port}/${connection.database}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(connectionString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 font-mono text-sm relative group">
            <div className="flex items-center justify-between mb-2">
                 <span className="text-xs text-gray-500 font-sans font-medium uppercase tracking-wide">Connection String</span>
            </div>
            <div className="overflow-x-auto pb-1 mb-1 text-gray-800 break-all pr-16 min-h-[1.5em]">
                {displayString}
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 bg-gray-50 pl-2">
                 <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                    title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                 >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                 </button>
                 <button 
                    onClick={handleCopy}
                    className="p-1.5 text-blue-600 hover:text-blue-700 rounded-md hover:bg-blue-50 transition-colors"
                    title="Salin connection string"
                 >
                    {copied ? <span className="text-xs font-bold px-1">Disalin!</span> : <Copy size={16} />}
                 </button>
            </div>
        </div>
    );
};

const UsageBar = ({ label, value, max, unit, percentage, color = "bg-blue-600" }) => (
  <div className="w-full">
    <div className="flex justify-between mb-1.5 text-sm">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-900 font-semibold">{value}{unit && ` ${unit}`} <span className="text-gray-400 font-normal">/ {max}{unit && ` ${unit}`}</span></span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div className={`${color} h-2 rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

const QuickAction = ({ icon: Icon, label, description, color = "text-blue-600", bgColor = "bg-blue-50" }) => (
  <button className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-blue-100 hover:shadow-md transition-all text-left group w-full">
    <div className={`p-3 rounded-lg ${bgColor} ${color} group-hover:scale-110 transition-transform`}>
      <Icon size={24} />
    </div>
    <div>
      <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{label}</h4>
      <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
    </div>
  </button>
);

const MainContent = () => {
  const service = dbData;

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>
        <ChevronRight size={14} />
        <Link to="/dashboard/database" className="hover:text-blue-600">
          Database
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">Kelola {service.name}</span>
      </div>

      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="h-16 w-16 bg-gray-50 rounded-xl flex items-center justify-center p-3 border border-gray-100">
              {service.icon ? (
                <img
                  src={service.icon}
                  alt={service.engine}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Database size={32} className="text-blue-600" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {service.name}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <StatusBadge status={service.status} />
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Activity size={14} />
                  {service.engine} v{service.version}
                </span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Server size={14} />
                  {service.location}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                <RotateCcw size={16} />
                Restart
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm shadow-blue-200">
                <Settings size={16} />
                Pengaturan
            </button>
          </div>
        </div>

        {/* Resources Summary */}
        <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Cpu size={20} />
                </div>
                <div>
                   <p className="text-xs text-gray-500 mb-0.5">vCPU</p>
                   <p className="font-semibold text-gray-900">{service.resources.cpu}</p>
                </div>
            </div>
             <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <HardDrive size={20} />
                </div>
                <div>
                   <p className="text-xs text-gray-500 mb-0.5">Memori</p>
                   <p className="font-semibold text-gray-900">{service.resources.ram}</p>
                </div>
            </div>
             <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                    <Database size={20} />
                </div>
                <div>
                   <p className="text-xs text-gray-500 mb-0.5">Paket Penyimpanan</p>
                   <p className="font-semibold text-gray-900">{service.resources.storage.total} {service.resources.storage.unit}</p>
                </div>
            </div>
             <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                    <Shield size={20} />
                </div>
                <div>
                   <p className="text-xs text-gray-500 mb-0.5">Backup</p>
                   <p className="font-semibold text-gray-900">{service.backups.retention} retensi</p>
                </div>
            </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column: Stats & Connection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Connection Details */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Detail Koneksi</h3>
                <div className="space-y-4">
                    <ConnectionString connection={service.connection} engine={service.engine} />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <span className="text-xs text-gray-500 block mb-1">Host</span>
                            <span className="text-sm font-medium text-gray-900 font-mono select-all">{service.connection.host}</span>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <span className="text-xs text-gray-500 block mb-1">Port</span>
                            <span className="text-sm font-medium text-gray-900 font-mono select-all">{service.connection.port}</span>
                        </div>
                         <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <span className="text-xs text-gray-500 block mb-1">Nama Database</span>
                            <span className="text-sm font-medium text-gray-900 font-mono select-all">{service.connection.database}</span>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <span className="text-xs text-gray-500 block mb-1">Username</span>
                            <span className="text-sm font-medium text-gray-900 font-mono select-all">{service.connection.username}</span>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-2 text-xs bg-blue-50 p-3 rounded-lg text-blue-800">
                        <Shield size={14} className="mt-0.5 shrink-0" />
                        <p>
                        Akses publik diaktifkan. Untuk keamanan yang lebih baik, batasi akses ke sumber terpercaya di tab Pengaturan.
                        </p>
                    </div>
                </div>
            </div>
            
             {/* Monitoring */}
             <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Metrik Performa</h3>
                <div className="space-y-6">
                    <UsageBar 
                        label="Penggunaan Disk" 
                        value={service.resources.storage.used} 
                        max={service.resources.storage.total} 
                        unit={service.resources.storage.unit} 
                        percentage={service.resources.storage.percentage} 
                        color="bg-purple-600"
                    />
                    <UsageBar 
                        label="Koneksi Aktif" 
                        value={service.resources.connections.active} 
                        max={service.resources.connections.max} 
                        unit="" 
                        percentage={service.resources.connections.percentage} 
                        color="bg-green-600"
                    />
                     <UsageBar 
                        label="Penggunaan CPU (Rata-rata)" 
                        value={service.metrics.cpuUsage} 
                        max={100} 
                        unit="%" 
                        percentage={service.metrics.cpuUsage} 
                        color="bg-blue-600"
                    />
                </div>
             </div>
        </div>

        {/* Right Column: Actions */}
        <div className="lg:col-span-1 space-y-6">
             {/* Quick Actions */}
            <div>
                 <h3 className="text-lg font-bold text-gray-900 mb-4">Aksi Cepat</h3>
                 <div className="space-y-3">
                    <QuickAction 
                        icon={Users} 
                        label="Pengguna & Database" 
                        description="Kelola pengguna database dan buat database baru."
                        color="text-indigo-600"
                        bgColor="bg-indigo-50"
                    />
                     <QuickAction 
                        icon={Shield} 
                        label="Sumber Terpercaya" 
                        description="Batasi akses ke alamat IP tertentu."
                        color="text-green-600"
                        bgColor="bg-green-50"
                    />
                     <QuickAction 
                        icon={Download} 
                        label="Backup" 
                        description={`Backup terakhir: ${service.backups.lastBackup}`}
                        color="text-orange-600"
                        bgColor="bg-orange-50"
                    />
                     <QuickAction 
                        icon={Terminal} 
                        label="Log" 
                        description="Lihat log query dan error."
                        color="text-gray-700"
                        bgColor="bg-gray-100"
                    />
                 </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                <h3 className="text-sm font-bold text-red-700 mb-2 flex items-center gap-2">
                    <AlertCircle size={16} />
                    Zona Bahaya
                </h3>
                <p className="text-xs text-red-600 mb-4">
                    Menghapus cluster database Anda adalah tindakan permanen dan tidak dapat dibatalkan.
                </p>
                <div className="space-y-2">
                     <button className="w-full px-3 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-xs font-medium hover:bg-red-50 transition-colors">
                        Matikan Cluster
                    </button>
                    <button className="w-full px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors shadow-sm shadow-red-200">
                        Hancurkan Cluster
                    </button>
                </div>
             </div>
        </div>
      </div>
    </main>
  );
};

export default function ManageDatabase() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Kelola Database - DockPloy</title>
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
  );
}
