import React, { useState } from "react";
import { Link, useParams } from "react-router";
import { Helmet } from "react-helmet-async";
import {
  Server,
  Globe,
  HardDrive,
  Cpu,
  Activity,
  Shield,
  Key,
  Database,
  Mail,
  FolderOpen,
  Settings,
  Terminal,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Lock,
  Download,
  MoreVertical,
  Play,
  Square
} from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardTopbar } from "@/components/DashboardTopbar";

// Mock Data for a specific hosting service
const hostingData = {
  id: 1,
  domain: "belajar-react.com",
  ip: "192.168.1.101",
  serverNames: ["ns1.dockploy.com", "ns2.dockploy.com"],
  plan: "Business Cloud",
  status: "aktif",
  location: "Jakarta (ID)",
  expiryDate: "12 Des 2024",
  autoRenew: true,
  os: "Ubuntu 22.04 LTS",
  panel: "CyberPanel",
  diskUsage: {
    used: 15,
    total: 50,
    unit: "GB",
    percentage: 30
  },
  bandwidthUsage: {
    used: 120,
    total: 1000,
    unit: "GB",
    percentage: 12
  },
  phpVersion: "8.2",
  sslStatus: "Aktif (Let's Encrypt)"
};

const StatusBadge = ({ status }) => {
  const styles = {
    aktif: "bg-green-100 text-green-700",
    suspended: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
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

const UsageCard = ({ title, icon: Icon, used, total, unit, percentage, color = "bg-blue-600" }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 rounded-lg ${color.replace('bg-', 'bg-opacity-10 bg-').replace('600', '50 text-' + color.replace('bg-', ''))}`}>
        <Icon size={20} />
      </div>
      <h3 className="font-medium text-gray-900">{title}</h3>
    </div>
    <div className="mb-2 flex justify-between text-sm">
      <span className="text-gray-500 font-medium">{used} {unit} Terpakai</span>
      <span className="text-gray-400">{total} {unit} Total</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div className={`h-2 rounded-full ${color}`} style={{ width: `${percentage}%` }}></div>
    </div>
    <p className="mt-3 text-xs text-gray-400 text-right">{percentage}% Terpakai</p>
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
  // Use mock data
  const service = hostingData;

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        <ChevronRight size={14} />
        <Link to="/dashboard/hosting" className="hover:text-blue-600">Hosting</Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">Kelola {service.domain}</span>
      </div>

      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-5">
                <div className="h-16 w-16 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <Globe size={32} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{service.domain}</h1>
                    <div className="flex items-center gap-3 flex-wrap">
                        <StatusBadge status={service.status} />
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Server size={14} />
                            {service.ip}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Activity size={14} />
                            {service.plan}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                    <ExternalLink size={16} />
                    Kunjungi Situs
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm shadow-blue-200">
                    <Settings size={16} />
                    Panel Kontrol
                </button>
            </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             <div>
                <p className="text-xs text-gray-500 mb-1">Lokasi Server</p>
                <div className="flex items-center gap-2 font-medium text-gray-900">
                    <img src="https://flagcdn.com/w20/id.png" alt="ID" className="w-5 rounded-sm" />
                    {service.location}
                </div>
             </div>
             <div>
                <p className="text-xs text-gray-500 mb-1">Tanggal Kadaluarsa</p>
                <div className="flex items-center gap-2 font-medium text-gray-900">
                    {service.expiryDate}
                    {service.autoRenew && <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100">Otomatis</span>}
                </div>
             </div>
             <div>
                <p className="text-xs text-gray-500 mb-1">Status SSL</p>
                <div className="flex items-center gap-2 font-medium text-green-600">
                    <Lock size={14} />
                    {service.sslStatus}
                </div>
             </div>
             <div>
                <p className="text-xs text-gray-500 mb-1">Versi PHP</p>
                <div className="font-medium text-gray-900">
                    v{service.phpVersion}
                </div>
             </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Resource Usage Column */}
        <div className="lg:col-span-1 space-y-6">
            <h2 className="text-lg font-bold text-gray-900">Penggunaan Sumber Daya</h2>
            <UsageCard 
                title="Disk Usage" 
                icon={HardDrive}
                used={service.diskUsage.used}
                total={service.diskUsage.total}
                unit={service.diskUsage.unit}
                percentage={service.diskUsage.percentage}
                color="bg-purple-600"
            />
            <UsageCard 
                title="Bandwidth" 
                icon={Activity}
                used={service.bandwidthUsage.used}
                total={service.bandwidthUsage.total}
                unit={service.bandwidthUsage.unit}
                percentage={service.bandwidthUsage.percentage}
                color="bg-green-600"
            />
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-medium text-gray-900 mb-4">Informasi Server</h3>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Sistem Operasi</span>
                        <span className="font-medium text-gray-900">{service.os}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Panel Kontrol</span>
                        <span className="font-medium text-gray-900">{service.panel}</span>
                    </div>
                    <div className="pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-2">Nameserver</p>
                        <div className="space-y-1">
                            {service.serverNames.map((ns, idx) => (
                                <div key={idx} className="bg-gray-50 px-3 py-1.5 rounded text-sm text-gray-700 font-mono border border-gray-100">
                                    {ns}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Quick Actions Column */}
        <div className="lg:col-span-2">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Aksi Cepat</h2>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <QuickAction 
                    icon={FolderOpen} 
                    label="Manajer File" 
                    description="Akses dan kelola file Anda langsung dari browser."
                    color="text-yellow-600"
                    bgColor="bg-yellow-50"
                />
                <QuickAction 
                    icon={Database} 
                    label="Database MySQL" 
                    description="Buat dan kelola database dan pengguna MySQL."
                    color="text-blue-600"
                    bgColor="bg-blue-50"
                />
                 <QuickAction 
                    icon={Mail} 
                    label="Akun Email" 
                    description="Kelola alamat email profesional untuk domain Anda."
                    color="text-purple-600"
                    bgColor="bg-purple-50"
                />
                 <QuickAction 
                    icon={Shield} 
                    label="Status SSL/TLS" 
                    description="Kelola sertifikat SSL dan pengaturan keamanan."
                    color="text-green-600"
                    bgColor="bg-green-50"
                />
                 <QuickAction 
                    icon={Terminal} 
                    label="Akses SSH" 
                    description="Kelola kunci SSH dan akses terminal ke server Anda."
                    color="text-gray-700"
                    bgColor="bg-gray-100"
                />
                 <QuickAction 
                    icon={Download} 
                    label="Backup" 
                    description="Lihat, pulihkan, atau unduh backup website Anda."
                    color="text-indigo-600"
                    bgColor="bg-indigo-50"
                />
                <QuickAction 
                    icon={RefreshCw} 
                    label="Restart Layanan" 
                    description="Restart PHP, Nginx, atau layanan server lainnya."
                    color="text-orange-600"
                    bgColor="bg-orange-50"
                />
                 <QuickAction 
                    icon={Key} 
                    label="Ganti Password" 
                    description="Perbarui password akun hosting atau FTP Anda."
                    color="text-teal-600"
                    bgColor="bg-teal-50"
                />
             </div>

             <div className="mt-8 bg-red-50 border border-red-100 rounded-xl p-6">
                <h3 className="text-lg font-bold text-red-700 mb-2">Zona Bahaya</h3>
                <p className="text-sm text-red-600 mb-4">
                    Hati-hati dengan tindakan ini. Menghapus akun hosting Anda tidak dapat dibatalkan dan semua data akan hilang.
                </p>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                        Hentikan Server
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm shadow-red-200">
                        Hapus Akun
                    </button>
                </div>
             </div>
        </div>
      </div>
    </main>
  );
};

export default function ManageHosting() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Kelola Hosting - DockPloy</title>
      </Helmet>

      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activePage="/dashboard/hosting"
        />

        <div className="flex-1 lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
          <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />
          <MainContent />
        </div>
      </div>
    </>
  );
}
