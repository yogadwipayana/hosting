import React, { useState } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import {
  Activity,
  Cpu,
  HardDrive,
  Settings,
  MoreVertical,
  Play,
  Square,
  Clock,
  Workflow,
  Zap,
  Globe,
  ExternalLink,
  ChevronRight,
  RotateCw,
  Terminal,
  Shield,
  Key
} from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardTopbar } from "@/components/DashboardTopbar";
import { Button } from "@/components/ui/button";

// Mock Data for n8n automation instance
const automationData = {
  id: 1,
  name: "marketing-automation",
  url: "n8n.dockploy.com",
  status: "aktif",
  version: "1.24.1",
  location: "Jakarta (ID)",
  uptime: "14h 2j 15m",
  plan: "Pro Automation",
  cpu: {
    used: 0.8,
    total: 2,
    unit: "vCPU",
    percentage: 40
  },
  ram: {
    used: 1.2,
    total: 4,
    unit: "GB",
    percentage: 30
  },
  executions: {
    total: 1450,
    success: 1420,
    failed: 30,
    percentage: 97.9
  }
};

const StatusBadge = ({ status }) => {
  const styles = {
    aktif: "bg-green-100 text-green-700 border-green-200",
    stopped: "bg-red-100 text-red-700 border-red-200",
    starting: "bg-blue-100 text-blue-700 border-blue-200",
    maintenance: "bg-yellow-100 text-yellow-700 border-yellow-200"
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize border ${
        styles[status] || styles.aktif
      }`}
    >
      {status}
    </span>
  );
};

const UsageCard = ({ title, icon: Icon, value, total, unit, percentage, color = "bg-blue-600" }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 rounded-lg ${color.replace('bg-', 'bg-opacity-10 text-').replace('600', '600')}`}>
        <Icon size={20} />
      </div>
      <h3 className="font-medium text-gray-900">{title}</h3>
    </div>
    <div className="mb-2 flex justify-between text-sm">
      <span className="text-gray-900 font-bold text-xl">{value} <span className="text-sm font-normal text-gray-500">{unit}</span></span>
      <span className="text-gray-400 text-xs self-end mb-1">dari {total} {unit}</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
      <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

const QuickAction = ({ icon: Icon, label, description, onClick, variant = "default" }) => {
  const variants = {
    default: "bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 text-gray-700",
    danger: "bg-red-50 border-red-100 hover:bg-red-100 text-red-700"
  };

  return (
    <button 
      onClick={onClick}
      className={`flex items-start gap-4 p-4 rounded-xl border transition-all text-left w-full h-full ${variants[variant]}`}
    >
      <div className={`p-2 rounded-lg bg-white shadow-sm border border-gray-100 shrink-0`}>
        <Icon size={20} className={variant === 'danger' ? 'text-red-600' : 'text-blue-600'} />
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-1">{label}</h4>
        <p className="text-xs opacity-80 leading-relaxed">{description}</p>
      </div>
    </button>
  );
};

const MainContent = () => {
  // Use mock data
  const data = automationData;

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50/50 p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
        <ChevronRight size={14} />
        <Link to="/dashboard/automation" className="hover:text-primary transition-colors">Otomasi</Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">Kelola {data.name}</span>
      </div>

      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-5">
                <div className="h-16 w-16 bg-linear-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink-200">
                    <Workflow size={32} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{data.name}</h1>
                    <div className="flex items-center gap-4 flex-wrap">
                        <StatusBadge status={data.status} />
                        <a href={`https://${data.url}`} target="_blank" rel="noreferrer" className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
                            <Globe size={14} />
                            {data.url}
                        </a>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock size={14} />
                            {data.uptime} uptime
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                    <RotateCw size={16} />
                    Restart
                </Button>
                <Button className="gap-2 bg-rose-600 hover:bg-rose-700 text-white border-none shadow-md shadow-rose-200">
                    <ExternalLink size={16} />
                    Buka Editor
                </Button>
            </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-6">
             <div>
                <p className="text-xs text-gray-500 mb-1">Versi</p>
                <div className="font-medium text-gray-900 flex items-center gap-2">
                    v{data.version}
                    <span className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded border border-green-100">Terbaru</span>
                </div>
             </div>
             <div>
                <p className="text-xs text-gray-500 mb-1">Paket</p>
                <div className="font-medium text-gray-900">{data.plan}</div>
             </div>
             <div>
                <p className="text-xs text-gray-500 mb-1">Lokasi</p>
                <div className="flex items-center gap-2 font-medium text-gray-900">
                    <img src="https://flagcdn.com/w20/id.png" alt="ID" className="w-5 rounded-sm" />
                    {data.location}
                </div>
             </div>
             <div>
                <p className="text-xs text-gray-500 mb-1">Eksekusi (24h)</p>
                <div className="flex items-center gap-2 font-medium text-gray-900">
                    <Zap size={14} className="text-yellow-500" />
                    {data.executions.total}
                </div>
             </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Statistics Column */}
        <div className="lg:col-span-1 space-y-6">
            <h2 className="text-lg font-bold text-gray-900">Sumber Daya Sistem</h2>
            <UsageCard 
                title="Penggunaan CPU" 
                icon={Cpu}
                value={data.cpu.used}
                total={data.cpu.total}
                unit={data.cpu.unit}
                percentage={data.cpu.percentage}
                color="bg-purple-600"
            />
            <UsageCard 
                title="Penggunaan Memori" 
                icon={HardDrive}
                value={data.ram.used}
                total={data.ram.total}
                unit={data.ram.unit}
                percentage={data.ram.percentage}
                color="bg-blue-600"
            />
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-medium text-gray-900 mb-4">Statistik Eksekusi</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg border border-green-100">
                        <span className="text-sm text-green-700 font-medium">Sukses</span>
                        <span className="font-bold text-green-700">{data.executions.success}</span>
                    </div>
                    <div className="flex justify-between items-center bg-red-50 p-3 rounded-lg border border-red-100">
                        <span className="text-sm text-red-700 font-medium">Gagal</span>
                        <span className="font-bold text-red-700">{data.executions.failed}</span>
                    </div>
                    <div className="text-xs text-center text-gray-500 pt-2">
                        Tingkat Sukses: <span className="font-medium text-gray-900">{data.executions.percentage}%</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Management Column */}
        <div className="lg:col-span-2 space-y-8">
             <div>
                 <h2 className="text-lg font-bold text-gray-900 mb-4">Manajemen & Alat</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <QuickAction 
                        icon={Settings} 
                        label="Variabel Lingkungan" 
                        description="Konfigurasi env vars, API keys, dan rahasia untuk workflow Anda."
                    />
                    <QuickAction 
                        icon={Terminal} 
                        label="Log & Monitoring" 
                        description="Lihat log real-time dan riwayat eksekusi."
                    />
                     <QuickAction 
                        icon={Shield} 
                        label="Keamanan Jaringan" 
                        description="Konfigurasi aturan firewall dan IP yang diizinkan."
                    />
                     <QuickAction 
                        icon={Key} 
                        label="Kontrol Akses" 
                        description="Kelola pengguna dan kredensial API."
                    />
                 </div>
             </div>

             <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                        <Activity size={24} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-red-800 mb-1">Zona Bahaya</h3>
                        <p className="text-sm text-red-600 mb-6">
                            Tindakan di sini dapat menyebabkan downtime layanan atau kehilangan data permanen. Harap pastikan.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                                Hentikan Instance
                            </Button>
                            <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                                Hapus Layanan
                            </Button>
                        </div>
                    </div>
                </div>
             </div>
        </div>
      </div>
    </main>
  );
};

export default function ManageAutomation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Kelola Otomasi - DockPloy</title>
      </Helmet>

      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activePage="/dashboard/automation"
        />

        <div className="flex-1 lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
          <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />
          <MainContent />
        </div>
      </div>
    </>
  );
}
