import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import { 
  GlobeIcon, 
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Zap, Server, Cpu, HardDrive, Rocket, MemoryStick, ArrowLeft, Lock, User, Mail, Globe } from "lucide-react"

export default function DeployAutomation() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  // State Form
  const [selectedLocation, setSelectedLocation] = useState("sg")
  const [selectedPlatform, setSelectedPlatform] = useState("n8n")
  const [selectedPlan, setSelectedPlan] = useState("starter")
  const [billingCycle, setBillingCycle] = useState("monthly")
  
  // Instance Config
  const [instanceName, setInstanceName] = useState("")
  const [adminEmail, setAdminEmail] = useState("")
  const [adminPass, setAdminPass] = useState("")

  const locations = [
    { id: "sg", name: "Singapore", flag: "🇸🇬" },
    { id: "id", name: "Jakarta", flag: "🇮🇩" },
  ]

  const platforms = [
    { id: "n8n", name: "n8n", description: "Workflow Automation", icon: "/images/n8n.svg" },
  ]

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: 30000,
      specs: { cpu: "1 vCPU", ram: "1 GB RAM", storage: "15 GB SSD" },
      executions: "Unlimited Executions"
    },
    {
      id: "pro",
      name: "Pro",
      price: 50000,
      specs: { cpu: "1 vCPU", ram: "2 GB RAM", storage: "25 GB SSD" },
      executions: "Unlimited Executions"
    }
  ]

  const handleDeploy = () => {
    if (!instanceName || !adminEmail || !adminPass) {
      alert("Mohon lengkapi konfigurasi instance (Nama, Email, Password)")
      return
    }

    alert(`Deploying ${selectedPlatform} (${selectedPlan}) in ${selectedLocation}`)
    navigate("/dashboard/automation")
  }

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val)
  }

  return (
    <>
      <Helmet>
        <title>Deploy Automation - BelajarHosting</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          activePage="/dashboard/automation"
        />
        
        <div className="flex-1 lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
          <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />
          
          <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <LinkToBack />
                <h1 className="text-2xl font-bold text-gray-900 mt-4">Deploy Automation</h1>
                <p className="text-gray-500">Deploy self-hosted automation workflows dalam hitungan menit.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Configuration */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Location Selection */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                       <HugeiconsIcon icon={GlobeIcon} size={20} className="text-blue-600" />
                       Pilih Lokasi Server
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {locations.map((loc) => (
                        <div 
                          key={loc.id}
                          onClick={() => setSelectedLocation(loc.id)}
                          className={`cursor-pointer border rounded-lg p-4 flex items-center gap-3 transition-all ${
                            selectedLocation === loc.id 
                              ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600" 
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <span className="text-2xl">{loc.flag}</span>
                          <span className={`font-medium ${selectedLocation === loc.id ? "text-blue-700" : "text-gray-700"}`}>
                            {loc.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Platform Selection */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                       <Zap size={20} className="text-blue-600" />
                       Pilih Platform
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {platforms.map((platform) => (
                        <div 
                          key={platform.id}
                          onClick={() => setSelectedPlatform(platform.id)}
                          className={`cursor-pointer border rounded-xl p-4 transition-all relative ${
                            selectedPlatform === platform.id 
                              ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600" 
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center p-1.5 border border-gray-100">
                                <img src={platform.icon} alt={platform.name} className="w-full h-full object-contain" />
                             </div>
                             <div>
                               <div className="font-bold text-gray-900">{platform.name}</div>
                               <div className="text-xs text-gray-500">{platform.description}</div>
                             </div>
                             {selectedPlatform === platform.id && (
                               <div className="ml-auto">
                                 <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                               </div>
                             )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Plan Selection */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                       <Server size={20} className="text-blue-600" />
                       Pilih Paket Resources
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

                  {/* Instance Configuration */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                       <Lock size={20} className="text-blue-600" />
                       Konfigurasi Instance
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Instance</label>
                        <div className="relative">
                          <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <div className="flex">
                            <input 
                              type="text" 
                              value={instanceName}
                              onChange={(e) => setInstanceName(e.target.value)}
                              className="flex-1 pl-10 pr-4 py-2 border border-r-0 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 outline-none"
                              placeholder="my-automation"
                            />
                            <div className="flex items-center px-4 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-r-lg">
                              .dockploy.com
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Instance Anda akan dapat diakses melalui URL ini.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                          <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                              type="email" 
                              value={adminEmail}
                              onChange={(e) => setAdminEmail(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                              placeholder="admin@example.com"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                          <div className="relative">
                            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                              type="password" 
                              value={adminPass}
                              onChange={(e) => setAdminPass(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
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
                        <span className="text-gray-500">Lokasi</span>
                        <span className="font-medium text-gray-900">{locations.find(l => l.id === selectedLocation).name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Platform</span>
                        <span className="font-medium text-gray-900">{platforms.find(p => p.id === selectedPlatform).name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Paket</span>
                        <span className="font-medium text-gray-900">{plans.find(p => p.id === selectedPlan).name}</span>
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
                                   {formatCurrency(plans.find(p => p.id === selectedPlan).price * 12)}
                                 </span>
                                 <span className="font-bold text-xl text-blue-600">
                                   {formatCurrency(plans.find(p => p.id === selectedPlan).price * 10)}
                                   <span className="text-sm font-normal text-gray-500">/thn</span>
                                 </span>
                               </>
                           ) : (
                               <span className="font-bold text-xl text-blue-600">
                                 {formatCurrency(plans.find(p => p.id === selectedPlan).price)}
                                 <span className="text-sm font-normal text-gray-500">/bln</span>
                               </span>
                           )}
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={handleDeploy}
                      className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all"
                    >
                      <Rocket size={18} />
                      Deploy Automation
                    </button>
                    
                    <p className="text-xs text-center text-gray-500 mt-4">
                      Instance Anda akan siap dalam 2-3 menit.
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
