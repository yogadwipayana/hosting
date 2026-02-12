import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate, Link } from "react-router"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import DomainPrice, { domainPricingData } from "@/components/DomainPrice"
import { domainApi } from "@/lib/api"
import { Search, CheckCircle, XCircle, Globe, ShoppingCart, ArrowLeft, Loader2 } from "lucide-react"

export default function DeployDomain() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  
  // State
  const [searchTerm, setSearchTerm] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [searchResult, setSearchResult] = useState(null) // Array of { domain: string, available: boolean, price: number }
  const [cart, setCart] = useState(null) // { domain: string, price: number, year: number }
  const [domainName, setDomainName] = useState("")

  const tldPrices = domainPricingData.map(item => ({
    tld: item.tld,
    price: parseInt(item.register.replace(/[^0-9]/g, "")),
    popular: false
  }))

  // Get price for a domain based on its TLD
  const getDomainPrice = (domain) => {
    const tld = domain.substring(domain.lastIndexOf('.'))
    const priceData = tldPrices.find(p => p.tld === tld)
    return priceData ? priceData.price : 150000 // Default price
  }

  const handleSearch = async () => {
    if (!searchTerm) return

    // Validate that user specified a TLD
    if (!searchTerm.includes('.')) {
      alert('Silakan masukkan domain lengkap dengan ekstensi, contoh: domain.com')
      return
    }

    setIsChecking(true)
    setSearchResult(null)

    // Parse domain name and TLD
    const cleanDomain = searchTerm.toLowerCase().replace(/[^a-z0-9.-]/g, "")
    setDomainName(cleanDomain)

    try {
      // Call API to check specific domain
      const response = await domainApi.checkDomain(cleanDomain)

      if (response.status === 'success') {
        const result = response.data
        if (result.available) {
          setSearchResult([{
            domain: result.domain,
            available: true,
            price: getDomainPrice(result.domain)
          }])
        } else {
          setSearchResult([])
        }
      }
    } catch (error) {
      console.error('Domain check failed:', error)
    } finally {
      setIsChecking(false)
    }
  }

  const handleAddToCart = (item) => {
    if (item && item.available) {
      setCart({
        domain: item.domain,
        price: item.price,
        year: 1
      })
    }
  }

  const handleCheckout = () => {
    alert(`Process checkout for ${cart.domain} - Rp ${cart.price}`)
    // Navigate to payment or dashboard
    navigate("/dashboard/hosting")
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <>
      <Helmet>
        <title>Beli Domain Baru - DockPloy</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex">
        <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-300">
          <DashboardTopbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-6">
                <LinkToBack />
                <h1 className="text-2xl font-bold text-gray-900 mt-2">Beli Domain Baru</h1>
                <p className="text-gray-500">Amankan nama domain impian Anda sekarang sebelum diambil orang lain.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left: Search & Config */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Search Card */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                         <Globe size={20} className="text-blue-600" />
                         Cari Domain
                      </h2>
                      <Link to="/alat/domain-checker" className="text-sm text-blue-600 hover:text-blue-700 font-medium underline">
                        Cek Domain lebih mudah disini
                      </Link>
                    </div>
                    
                    <div className="flex gap-2">
                      <div className="flex-1 flex rounded-lg shadow-sm">
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                          disabled={isChecking}
                          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none min-w-0 disabled:bg-gray-100"
                          placeholder="nama-domain.com (masukkan dengan ekstensi)"
                        />
                      </div>
                      <button
                        onClick={handleSearch}
                        disabled={isChecking || !searchTerm}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                      >
                        {isChecking ? (
                          <><Loader2 size={18} className="animate-spin" /> Mencari...</>
                        ) : (
                          <><Search size={18} /> Cari</>
                        )}
                      </button>
                    </div>

                    {/* Search Result */}
                    {searchResult && (
                      <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-top-2">
                        {searchResult.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <p className="font-medium text-red-600">Domain tidak tersedia.</p>
                            <p className="text-sm mt-1">Silakan coba dengan nama domain lain.</p>
                          </div>
                        ) : (
                          searchResult.map((result, idx) => (
                            <div key={idx} className="p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-green-50 border-green-200">
                              <div className="flex items-center gap-3">
                                <CheckCircle size={20} className="text-green-600 shrink-0" />
                                <span className="font-medium text-lg text-green-900">
                                  {result.domain} <strong>Tersedia!</strong>
                                </span>
                              </div>

                              <div className="flex items-center gap-4 self-end sm:self-auto">
                                <span className="font-bold text-green-800">
                                  {formatCurrency(result.price)}
                                </span>
                                <button
                                  onClick={() => handleAddToCart(result)}
                                  disabled={isChecking}
                                  className="bg-green-500 hover:bg-green-600 text-white font-bold uppercase text-xs px-8 py-2.5 rounded-lg transition-colors shadow-sm tracking-wider disabled:opacity-50"
                                >
                                  BELI
                                </button>
                              </div>
                            </div>
                          ))
                        )}

                      </div>
                    )}
                  </div>
                  
                  {/* Domain Price List */}
                  <div className="pt-4">
                     <DomainPrice />
                  </div>

                </div>

                {/* Right: Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
                    <h3 className="font-bold text-gray-900 mb-4">Ringkasan Order</h3>
                    
                    {cart ? (
                      <div className="space-y-4 mb-6">
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex justify-between items-start">
                           <div>
                             <p className="font-bold text-blue-900">{cart.domain}</p>
                             <p className="text-xs text-blue-700">Registrasi Domain Baru</p>
                           </div>
                           <button onClick={() => setCart(null)} className="text-red-500 hover:text-red-700">
                             <XCircle size={16} />
                           </button>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Durasi</span>
                          <span className="font-medium text-gray-900">1 Tahun</span>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                          <span className="font-bold text-gray-900">Total</span>
                          <span className="font-bold text-xl text-blue-600">
                            {formatCurrency(cart.price)}
                          </span>
                        </div>

                        <button 
                          onClick={handleCheckout}
                          className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all"
                        >
                          <ShoppingCart size={18} />
                          Bayar Sekarang
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Globe size={48} className="mx-auto mb-3 text-gray-300" />
                        <p>Belum ada domain yang dipilih.</p>
                        <p className="text-xs mt-1">Silakan cari dan pilih domain terlebih dahulu.</p>
                      </div>
                    )}
                    
                    <p className="text-xs text-center text-gray-500 mt-4">
                      Proses aktivasi domain instant setelah pembayaran dikonfirmasi.
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
