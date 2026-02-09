
import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import { 
  GlobeIcon, 
  CheckmarkCircle02Icon 
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Server, Cpu, HardDrive, Rocket, MemoryStick, ArrowLeft, Plus, Trash2, CheckCircle, XCircle } from "lucide-react"

export default function DeployHosting() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  // State Form
  const [selectedPlan, setSelectedPlan] = useState("starter")
  const [domain, setDomain] = useState("")
  const [subdomains, setSubdomains] = useState([])
  
  // Domain Check State (Business Plan)
  const [searchDomain, setSearchDomain] = useState("")
  const [checkingDomain, setCheckingDomain] = useState(false)
  const [domainCheckResult, setDomainCheckResult] = useState(null)
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [tld, setTld] = useState(".com")

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: 30000,
      specs: { cpu: "1 vCPU", ram: "1 GB RAM", storage: "15 GB SSD" },
      features: ["1 TB Bandwidth", "1 Sub Domain"],
      subdomainLimit: 1
    },
    {
      id: "pro",
      name: "Pro",
      price: 50000,
      specs: { cpu: "1 vCPU", ram: "2 GB RAM", storage: "25 GB SSD" },
      features: ["1 TB Bandwidth", "3 Sub Domain", "Staging Env"],
      subdomainLimit: 3
    },
    {
      id: "business",
      name: "Business",
      price: 100000,
      specs: { cpu: "2 vCPU", ram: "4 GB RAM", storage: "50 GB SSD" },
      features: ["2 TB Bandwidth", "Free Domain (Yearly)"],
      subdomainLimit: 5
    }
  ]

  // Enforce limit on plan change
  useEffect(() => {
    const limit = plans.find(p => p.id === selectedPlan)?.subdomainLimit || 0
    if (subdomains.length > limit) {
      setSubdomains(prev => prev.slice(0, limit))
    }
  }, [selectedPlan, subdomains.length])


  const handleAddSubdomain = () => {
    const currentLimit = plans.find(p => p.id === selectedPlan).subdomainLimit
    if (subdomains.length < currentLimit) {
      setSubdomains([...subdomains, ""])
    }
  }

  const handleRemoveSubdomain = (index) => {
    const newSubs = [...subdomains]
    newSubs.splice(index, 1)
    setSubdomains(newSubs)
  }

  const handleSubdomainChange = (index, value) => {
    const newSubs = [...subdomains]
    newSubs[index] = value
    setSubdomains(newSubs)
  }

  const handleCheckDomain = () => {
    if (!searchDomain) return

    // Clean input name
    const cleanName = searchDomain.toLowerCase().replace(/[^a-z0-9-]/g, "")
    const fullDomain = cleanName + tld

    setCheckingDomain(true)
    setDomainCheckResult(null)
    
    // Mock check
    setTimeout(() => {
      const isTaken = Math.random() < 0.3
      setDomainCheckResult(isTaken ? 'taken' : 'available')
      setCheckingDomain(false)
      
      // Auto set domain if available
      if (!isTaken) setDomain(fullDomain)
    }, 1500)
  }

  const handleDeploy = () => {
    // Logic deploy mock
    const finalDomain = domain || (subdomains.length > 0 ? `${subdomains[0]}.belajarhosting.com` : "")
    
    if (!finalDomain) {
      alert("Mohon tentukan domain atau subdomain terlebih dahulu")
      return
    }

    alert(`Deploying ${selectedPlan} in ${selectedLocation} for ${finalDomain}`)
    navigate("/dashboard/hosting")
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
        <title>Deploy Hosting - BelajarHosting</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          activePage="/dashboard/hosting"
        />
        
        <div className="flex-1 lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
          <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />
          
          <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <LinkToBack />
                <h1 className="text-2xl font-bold text-gray-900 mt-4">Deploy Managed Hosting</h1>
                <p className="text-gray-500">Launch your high-performance web application in minutes.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Configuration */}
                <div className="lg:col-span-2 space-y-6">
                  

                  {/* Plan Selection */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                       <Server size={20} className="text-blue-600" />
                       Pilih Paket Hosting
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
                                 {plan.id === 'pro' && (
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

                  {/* Domain Configuration */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                       <HugeiconsIcon icon={GlobeIcon} size={20} className="text-blue-600" />
                       Konfigurasi Domain
                    </h2>
                    <div>


                      <div className="mt-6 border-t border-gray-100 pt-6">
                        <div className="flex items-center justify-between mb-3">
                           <label className="block text-sm font-medium text-gray-700">Subdomain Tambahan</label>
                           <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-medium">
                             {subdomains.length} / {plans.find(p => p.id === selectedPlan).subdomainLimit} slot
                           </span>
                        </div>
                        
                        {subdomains.length > 0 && (
                          <div className="space-y-3 mb-3">
                            {subdomains.map((sub, index) => (
                               <div key={index} className="flex gap-2 items-center">
                                 <div className="flex-1 flex rounded-lg shadow-sm h-10">
                                   <input 
                                     type="text" 
                                     value={sub}
                                     onChange={(e) => handleSubdomainChange(index, e.target.value)}
                                     className="flex-1 rounded-l-lg border border-gray-300 px-4 focus:ring-2 focus:ring-blue-500 outline-none min-w-0"
                                     placeholder="subdomain"
                                   />
                                   <span className="inline-flex items-center px-4 rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                     .belajarhosting.com
                                   </span>
                                 </div>
                                 <button 
                                  onClick={() => handleRemoveSubdomain(index)}
                                  className="h-10 w-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                 >
                                    <Trash2 size={18} />
                                 </button>
                               </div>
                            ))}
                          </div>
                        )}

                        {subdomains.length < plans.find(p => p.id === selectedPlan).subdomainLimit ? (
                           <button onClick={handleAddSubdomain} className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1 transition-colors">
                              <Plus size={16} /> Tambah Subdomain
                           </button>
                        ) : (
                           <p className="text-xs text-orange-600 flex items-center gap-1 mt-2">
                             Slot penuh (Upgrade paket untuk menambah slot)
                           </p>
                        )}
                      </div>

                      {/* Business Plan - Free Domain Check */}
                      {selectedPlan === 'business' && billingCycle === 'yearly' && (
                        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 transition-all animate-in fade-in slide-in-from-top-4">
                           <div className="flex items-center gap-2 mb-3">
                              <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">FREE</span>
                              <h3 className="font-bold text-green-900 text-sm">Klaim Domain Gratis Anda</h3>
                           </div>
                           <p className="text-xs text-green-800 mb-3 leading-relaxed">
                             Paket Business termasuk <strong>1 domain gratis</strong> (.com, .net, .org, .id) untuk tahun pertama.
                           </p>
                           
                           <div className="flex gap-2">
                             <div className="flex-1 flex rounded-lg shadow-sm">
                               <input 
                                 type="text" 
                                 value={searchDomain}
                                 onChange={(e) => setSearchDomain(e.target.value)}
                                 className="flex-1 rounded-l-lg border border-green-300 border-r-0 px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm placeholder-green-700/50 bg-white min-w-0"
                                 placeholder="nama-domain"
                               />
                               <select
                                 value={tld}
                                 onChange={(e) => setTld(e.target.value)}
                                 className="rounded-r-lg border border-green-300 bg-green-50 px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none cursor-pointer border-l-0 text-green-900 font-medium hover:bg-green-100"
                               >
                                 <option value=".com">.com</option>
                                 <option value=".net">.net</option>
                                 <option value=".org">.org</option>
                                 <option value=".id">.id</option>
                               </select>
                             </div>
                             <button 
                               onClick={handleCheckDomain}
                               disabled={checkingDomain || !searchDomain}
                               className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 disabled:opacity-50 transition-colors shadow-sm"
                             >
                               {checkingDomain ? "Checking..." : "Cek"}
                             </button>
                           </div>

                           {domainCheckResult === 'available' && (
                              <div className="mt-3 flex items-start gap-2 text-sm text-green-800 font-medium bg-green-100 p-3 rounded-lg border border-green-200">
                                <CheckCircle size={18} className="text-green-600 shrink-0 mt-0.5" />
                                <div>
                                  <p>Selamat! <strong>{searchDomain}{tld}</strong> tersedia.</p>
                                  <p className="text-xs font-normal mt-1 opacity-80">Domain ini otomatis dipilih untuk pesanan Anda.</p>
                                </div>
                              </div>
                           )}

                           {domainCheckResult === 'taken' && (
                              <div className="mt-3 flex items-start gap-2 text-sm text-red-800 font-medium bg-red-50 p-3 rounded-lg border border-red-200">
                                <XCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
                                <div>
                                  <p>Maaf, <strong>{searchDomain}{tld}</strong> tidak tersedia.</p>
                                  <p className="text-xs font-normal mt-1 opacity-80">Silakan coba nama domain lain.</p>
                                </div>
                              </div>
                           )}
                        </div>
                      )}
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
                      disabled={!domain && subdomains.length === 0}
                      className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                         (domain || subdomains.length > 0)
                          ? "bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <Rocket size={18} />
                      Deploy Sekarang
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
