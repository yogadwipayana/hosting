import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ComputerIcon
} from "@hugeicons/core-free-icons"
import { Server, Cpu, HardDrive, Rocket, MemoryStick, ArrowLeft, Check, Loader2, AlertCircle } from "lucide-react"
import { vpsApi } from "@/lib/api"

export default function DeployVps() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  // State Form
  const [selectedPlan, setSelectedPlan] = useState("kvm1")
  const [selectedOs, setSelectedOs] = useState("ubuntu-22")
  const [hostname, setHostname] = useState("")
  const [rootPassword, setRootPassword] = useState("")
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [serverName, setServerName] = useState("")

  // Loading and error states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const plans = [
    {
      id: "kvm1",
      name: "KVM 1",
      price: 50000,
      specs: { cpu: "1 vCPU", ram: "1 GB RAM", storage: "20 GB NVMe" },
      bandwidth: "1 TB"
    },
    {
      id: "kvm2",
      name: "KVM 2",
      price: 100000,
      specs: { cpu: "2 vCPU", ram: "2 GB RAM", storage: "40 GB NVMe" },
      bandwidth: "2 TB"
    },
    {
      id: "kvm4",
      name: "KVM 4",
      price: 200000,
      specs: { cpu: "4 vCPU", ram: "4 GB RAM", storage: "80 GB NVMe" },
      bandwidth: "4 TB"
    }
  ]

  const operatingSystems = [
    { id: "ubuntu-24", name: "Ubuntu 24.04 LTS", icon: "🐧" },
    { id: "ubuntu-22", name: "Ubuntu 22.04 LTS", icon: "🐧" },
    { id: "debian-12", name: "Debian 12", icon: "🌀" },
    { id: "centos-8", name: "CentOS 8 Stream", icon: "🎩" },
    { id: "almalinux-9", name: "AlmaLinux 9", icon: "🔵" },
    { id: "rocky-9", name: "Rocky Linux 9", icon: "🪨" },
  ]

  const handleDeploy = async () => {
    // Validation
    if (!serverName.trim()) {
      setError("Mohon masukkan nama server")
      return
    }
    if (!hostname.trim()) {
      setError("Mohon masukkan hostname")
      return
    }
    if (!rootPassword || rootPassword.length < 8) {
      setError("Mohon masukkan root password minimal 8 karakter")
      return
    }

    setError(null)
    setLoading(true)

    try {
      await vpsApi.createVps({
        name: serverName,
        hostname: hostname,
        plan: selectedPlan,
        os: selectedOs,
        billingCycle: billingCycle,
        rootPassword: rootPassword
      })

      navigate("/dashboard/vps")
    } catch (err) {
      setError(err.message || "Gagal deploy VPS. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val)
  }

  const selectedPlanData = plans.find(p => p.id === selectedPlan)
  const monthlyPrice = selectedPlanData.price
  const yearlyPrice = monthlyPrice * 10 // 17% discount for yearly

  return (
    <>
      <Helmet>
        <title>Deploy VPS - BelajarHosting</title>
      </Helmet>

      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activePage="/dashboard/vps"
        />

        <div className="flex-1 lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
          <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />

          <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <LinkToBack />
                <h1 className="text-2xl font-bold text-gray-900 mt-4">Deploy VPS</h1>
                <p className="text-gray-500">Launch your Virtual Private Server in minutes.</p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Configuration */}
                <div className="lg:col-span-2 space-y-6">

                  {/* Server Name */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                       <Server size={20} className="text-blue-600" />
                       Nama Server
                    </h2>
                    <div>
                      <input
                        type="text"
                        value={serverName}
                        onChange={(e) => setServerName(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Contoh: Production Server"
                      />
                      <p className="text-xs text-gray-500 mt-1">Nama untuk identifikasi server Anda.</p>
                    </div>
                  </div>

                  {/* Plan Selection */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                       <Server size={20} className="text-blue-600" />
                       Pilih Paket VPS
                    </h2>
                    <div className="space-y-4">
                      {plans.map((plan) => (
                        <div
                          key={plan.id}
                          onClick={() => setSelectedPlan(plan.id)}
                          className={`cursor-pointer border rounded-xl p-5 transition-all relative ${
                            selectedPlan === plan.id
                              ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                               <div className="flex items-center gap-2 mb-1">
                                 <h3 className={`font-bold text-lg ${selectedPlan === plan.id ? "text-blue-700" : "text-gray-900"}`}>
                                   {plan.name}
                                 </h3>
                                 {plan.id === 'kvm2' && (
                                   <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">Popular</span>
                                 )}
                               </div>
                               <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                                  <span className="flex items-center gap-1"><Cpu size={14} /> {plan.specs.cpu}</span>
                                  <span className="flex items-center gap-1"><MemoryStick size={14} /> {plan.specs.ram}</span>
                                  <span className="flex items-center gap-1"><HardDrive size={14} /> {plan.specs.storage}</span>
                               </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg text-gray-900">{formatCurrency(plan.price)}<span className="text-sm font-normal text-gray-500">/bln</span></p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* OS Selection */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                       <HugeiconsIcon icon={ComputerIcon} size={20} className="text-blue-600" />
                       Pilih Sistem Operasi
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {operatingSystems.map((os) => (
                        <div
                          key={os.id}
                          onClick={() => setSelectedOs(os.id)}
                          className={`cursor-pointer border rounded-lg p-4 flex items-center gap-3 transition-all ${
                            selectedOs === os.id
                              ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <span className="text-2xl">{os.icon}</span>
                          <span className={`text-sm font-medium ${selectedOs === os.id ? "text-blue-700" : "text-gray-700"}`}>
                            {os.name}
                          </span>
                          {selectedOs === os.id && (
                            <Check size={16} className="ml-auto text-blue-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Server Configuration */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                       <Server size={20} className="text-blue-600" />
                       Konfigurasi Server
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hostname</label>
                        <input
                          type="text"
                          value={hostname}
                          onChange={(e) => setHostname(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="my-server"
                        />
                        <p className="text-xs text-gray-500 mt-1">Hostname untuk server Anda (tanpa spasi).</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Root Password</label>
                        <input
                          type="password"
                          value={rootPassword}
                          onChange={(e) => setRootPassword(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Minimal 8 karakter"
                        />
                        <p className="text-xs text-gray-500 mt-1">Gunakan kombinasi huruf, angka, dan simbol untuk keamanan yang lebih baik.</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right: Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">

                     {/* Billing Cycle Section */}
                     <h3 className="font-bold text-gray-900 mb-4">Pilih Durasi</h3>
                     <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
                        <button
                           onClick={() => setBillingCycle('monthly')}
                           className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                             billingCycle === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'
                           }`}
                        >
                          Bulanan
                        </button>
                        <button
                           onClick={() => setBillingCycle('yearly')}
                           className={`flex-1 py-2 text-sm font-medium rounded-md transition-all relative ${
                             billingCycle === 'yearly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'
                           }`}
                        >
                          Tahunan
                          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-1.5 rounded-full font-bold">Hemat 17%</span>
                        </button>
                     </div>

                    <h3 className="font-bold text-gray-900 mb-4">Ringkasan Order</h3>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Paket</span>
                        <span className="font-medium text-gray-900">{selectedPlanData.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">OS</span>
                        <span className="font-medium text-gray-900">{operatingSystems.find(o => o.id === selectedOs).name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Durasi</span>
                        <span className="font-medium text-gray-900 capitalize">{billingCycle === 'monthly' ? 'Bulanan' : 'Tahunan'}</span>
                      </div>

                      <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                        <span className="font-bold text-gray-900">Total</span>
                        <div className="text-right">
                           {billingCycle === 'yearly' ? (
                               <>
                                 <span className="block text-xs text-gray-400 line-through decoration-red-500">
                                   {formatCurrency(monthlyPrice * 12)}
                                 </span>
                                 <span className="font-bold text-xl text-blue-600">
                                   {formatCurrency(yearlyPrice)}
                                   <span className="text-sm font-normal text-gray-500">/thn</span>
                                 </span>
                               </>
                           ) : (
                               <span className="font-bold text-xl text-blue-600">
                                 {formatCurrency(monthlyPrice)}
                                 <span className="text-sm font-normal text-gray-500">/bln</span>
                               </span>
                           )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleDeploy}
                      disabled={!hostname || !rootPassword || !serverName || loading}
                      className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                         (hostname && rootPassword && serverName && !loading)
                          ? "bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Deploying...
                        </>
                      ) : (
                        <>
                          <Rocket size={18} />
                          Deploy Sekarang
                        </>
                      )}
                    </button>

                    <p className="text-xs text-center text-gray-500 mt-4">
                      Dengan mengklik tombol di atas, Anda menyetujui Syarat & Ketentuan layanan kami.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}



function LinkToBack() {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-2 transition-colors"
    >
      <ArrowLeft size={16} className="mr-1" />
      Kembali
    </button>
  )
}
