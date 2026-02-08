import React, { useState } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import {
  Globe,
  CheckCircle,
  XCircle,
  Shield,
  Key,
  Server,
  RefreshCw,
  MoreVertical,
  Activity,
  Calendar,
  Settings,
  Lock,
  Mail,
  FileText,
  AlertTriangle,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardTopbar } from "@/components/DashboardTopbar";

// Mock Data for a specific domain
const domainData = {
  id: 1,
  name: "belajar-react.com",
  status: "aktif",
  expiryDate: "12 Des 2024",
  autoRenew: true,
  registrar: "DockPloy Registrar",
  privacy: true, // ID Protection
  nameservers: [
    "ns1.dockploy.com",
    "ns2.dockploy.com",
    "ns3.dockploy.com"
  ],
  dnsRecords: [
    { type: "A", name: "@", value: "192.168.1.101", ttl: "3600" },
    { type: "CNAME", name: "www", value: "belajar-react.com", ttl: "3600" },
    { type: "MX", name: "@", value: "mail.belajar-react.com", priority: 10, ttl: "3600" },
    { type: "TXT", name: "@", value: "v=spf1 include:_spf.google.com ~all", ttl: "3600" }
  ],
  contact: {
      registrant: {
          name: "Yoga Dwipayana",
          organization: "Pribadi",
          email: "yogadwipayana2006@gmail.com",
          phone: "+6281234567890",
          address: "Jl. Merdeka No. 1, Jakarta"
      }
  }
};

const StatusBadge = ({ status }) => {
  const styles = {
    aktif: "bg-green-100 text-green-700",
    expired: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
    transfer: "bg-purple-100 text-purple-700"
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

const DNSRecordRow = ({ record }) => (
    <div className="grid grid-cols-12 gap-4 py-3 border-b border-gray-100 text-sm hover:bg-gray-50 transition-colors px-4 -mx-4">
        <div className="col-span-1 font-bold text-gray-700">{record.type}</div>
        <div className="col-span-3 text-gray-900 truncate" title={record.name}>{record.name}</div>
        <div className="col-span-5 text-gray-600 truncate font-mono text-xs pt-0.5" title={record.value}>{record.value}</div>
        <div className="col-span-2 text-gray-500 text-xs">{record.ttl}</div>
        <div className="col-span-1 text-right">
             <button className="text-gray-400 hover:text-blue-600">
                <Settings size={14} />
             </button>
        </div>
    </div>
)

const MainContent = () => {
  const domain = domainData;
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        <ChevronRight size={14} />
        <Link to="/dashboard/hosting" className="hover:text-blue-600">Hosting</Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">Kelola {domain.name}</span>
      </div>

      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-5">
                <div className="h-16 w-16 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
                    <Globe size={32} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{domain.name}</h1>
                    <div className="flex items-center gap-3 flex-wrap">
                        <StatusBadge status={domain.status} />
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Key size={14} />
                            Registrar: {domain.registrar}
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
                    <RefreshCw size={16} />
                    Perpanjang Sekarang
                </button>
            </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             <div>
                <p className="text-xs text-gray-500 mb-1">Tanggal Registrasi</p>
                <div className="flex items-center gap-2 font-medium text-gray-900">
                   12 Des 2023
                </div>
             </div>
             <div>
                <p className="text-xs text-gray-500 mb-1">Tanggal Kadaluarsa</p>
                <div className="flex items-center gap-2 font-medium text-gray-900">
                    {domain.expiryDate}
                </div>
             </div>
             <div>
                <p className="text-xs text-gray-500 mb-1">Perpanjangan Otomatis</p>
                <div className={`flex items-center gap-2 font-medium ${domain.autoRenew ? "text-green-600" : "text-gray-500"}`}>
                    <RefreshCw size={14} className={domain.autoRenew ? "" : "text-gray-400"} />
                    {domain.autoRenew ? "Aktif" : "Nonaktif"}
                </div>
             </div>
             <div>
                <p className="text-xs text-gray-500 mb-1">Proteksi Privasi</p>
                <div className={`flex items-center gap-2 font-medium ${domain.privacy ? "text-green-600" : "text-red-600"}`}>
                     {domain.privacy ? <Shield size={14}/> : <AlertTriangle size={14} />}
                    {domain.privacy ? "Aktif" : "Nonaktif"}
                </div>
             </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Left Col: DNS & Nameservers */}
        <div className="lg:col-span-2 space-y-6">
            {/* DNS Records */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                 <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">DNS Records</h2>
                    <button className="text-sm text-blue-600 font-medium hover:underline">Tambah Record</button>
                 </div>
                 
                 <div className="space-y-1">
                    <div className="grid grid-cols-12 gap-4 pb-2 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase px-4 -mx-4">
                        <div className="col-span-1">Tipe</div>
                        <div className="col-span-3">Nama</div>
                        <div className="col-span-5">Nilai</div>
                        <div className="col-span-2">TTL</div>
                        <div className="col-span-1"></div>
                    </div>
                    {domain.dnsRecords.map((record, idx) => (
                        <DNSRecordRow key={idx} record={record} />
                    ))}
                 </div>
            </div>

            {/* Nameservers */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                 <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Nameservers</h2>
                    <button className="text-sm text-blue-600 font-medium hover:underline">Ubah</button>
                 </div>
                 <div className="bg-gray-50 rounded-lg border border-gray-100 p-4 space-y-2">
                    {domain.nameservers.map((ns, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-gray-700 font-mono">
                            <Server size={14} className="text-gray-400" />
                            {ns}
                        </div>
                    ))}
                 </div>
                 <p className="text-xs text-gray-500 mt-3">
                    Mengubah nameserver memungkinkan Anda mengarahkan domain ke penyedia hosting yang berbeda. Propagasi bisa memakan waktu hingga 24 jam.
                 </p>
            </div>
        </div>

        {/* Right Col: Actions & Contact */}
        <div className="lg:col-span-1 space-y-6">
             {/* Quick Actions */}
             <div>
                 <h3 className="text-lg font-bold text-gray-900 mb-4">Aksi Domain</h3>
                 <div className="space-y-3">
                    <QuickAction 
                        icon={Mail} 
                        label="Email Forwarding" 
                        description="Teruskan email ke alamat lain."
                        color="text-indigo-600"
                        bgColor="bg-indigo-50"
                    />
                     <QuickAction 
                        icon={Lock} 
                        label="Kunci Transfer" 
                        description="Cegah transfer domain yang tidak sah."
                        color="text-green-600"
                        bgColor="bg-green-50"
                    />
                     <QuickAction 
                        icon={Key} 
                        label="Kode EPP/Auth" 
                        description="Dapatkan kode untuk transfer domain keluar."
                        color="text-orange-600"
                        bgColor="bg-orange-50"
                    />
                     <QuickAction 
                        icon={FileText} 
                        label="Kontak Whois" 
                        description="Perbarui informasi kontak domain."
                        color="text-blue-600"
                        bgColor="bg-blue-50"
                    />
                 </div>
            </div>

            {/* Contact Info Preview */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Kontak Registran</h3>
                <div className="text-sm space-y-2 text-gray-600">
                    <p className="font-medium text-gray-900">{domain.contact.registrant.name}</p>
                    <p>{domain.contact.registrant.organization}</p>
                    <p>{domain.contact.registrant.address}</p>
                    <p className="pt-2 flex items-center gap-2">
                        <Mail size={14} />
                        {domain.contact.registrant.email}
                    </p>
                </div>
            </div>
        </div>

      </div>
    </main>
  );
};

export default function ManageDomain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Kelola Domain - DockPloy</title>
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
