
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import { CreditCard, History, Plus, Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react"

export default function DashboardCredit() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")
  
  // Mock Data
  const [balance] = useState(0)
  const transactions = [
    { id: 1, date: "2024-03-20 14:30", description: "Top Up Credit via BCA", type: "credit", amount: 500000, status: "success" },
    { id: 2, date: "2024-03-21 09:00", description: "Hourly deduct - n8n-workflow-1", type: "debit", amount: 250, status: "success" },
    { id: 3, date: "2024-03-21 10:00", description: "Hourly deduct - n8n-workflow-1", type: "debit", amount: 250, status: "success" },
    { id: 4, date: "2024-03-21 11:00", description: "Hourly deduct - postgres-prod", type: "debit", amount: 150, status: "success" },
  ]

  const topUpOptions = [20000, 50000, 100000, 250000, 500000, 1000000]

  const handleAmountChange = (val) => {
    setAmount(val)
    if (val && val % 5000 !== 0) {
      setError("Jumlah harus kelipatan Rp 5.000")
    } else if (val < 10000) {
      setError("Minimal top up Rp 10.000")
    } else {
      setError("")
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

  return (
    <>
      <Helmet>
        <title>Credit & Billing - BelajarHosting</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          activePage="/dashboard/credit"
        />
        
        <div className="flex-1 lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
          <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />
          
          <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Credit & Billing</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Balance & Top Up */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Balance Card */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Wallet size={120} />
                  </div>
                  <div className="relative z-10">
                    <p className="text-blue-100 font-medium mb-2">Current Balance</p>
                    <h2 className="text-4xl font-bold mb-6">{formatCurrency(balance)}</h2>
                    <div className="flex gap-4">
                       <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                         <p className="text-xs text-blue-100">Monthly Usage</p>
                         <p className="font-semibold">Rp 154.000</p>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Top Up Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <Plus size={20} />
                    </div>
                    <h3 className="font-bold text-gray-900">Top Up Credit</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    {topUpOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAmountChange(opt)}
                        className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                          amount === opt 
                            ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600" 
                            : "border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-gray-50"
                        }`}
                      >
                        {formatCurrency(opt)}
                      </button>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Custom Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                        <input 
                          type="number" 
                          value={amount}
                          onChange={(e) => handleAmountChange(Number(e.target.value))}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${
                            error ? "border-red-300 focus:ring-red-200 focus:border-red-400" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                          step="5000"
                          placeholder="Enter amount..."
                        />
                      </div>
                      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </div>
                    
                    <button 
                      disabled={!!error || !amount}
                      className={`w-full font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        error || !amount ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      <CreditCard size={18} />
                      Proceed to Payment
                    </button>
                    <p className="text-xs text-center text-gray-500">
                      We support QRIS, Bank Transfer (BCA, Mandiri, BNI, BRI), and E-Wallets.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Transaction History */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full">
                   <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="p-2 bg-gray-50 text-gray-600 rounded-lg">
                         <History size={20} />
                       </div>
                       <h3 className="font-bold text-gray-900">Recent Transactions</h3>
                     </div>
                   </div>
                   
                   <div className="flex-1 overflow-auto p-2">
                     {transactions.map((tx) => (
                       <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                         <div className="flex items-center gap-3">
                           <div className={`p-2 rounded-full ${tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                             {tx.type === 'credit' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                           </div>
                           <div>
                             <p className="text-sm font-medium text-gray-900 line-clamp-1">{tx.description}</p>
                             <p className="text-xs text-gray-500">{tx.date}</p>
                           </div>
                         </div>
                         <div className={`text-sm font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                           {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                         </div>
                       </div>
                     ))}
                   </div>
                   
                   <div className="p-4 border-t border-gray-100">
                     <button className="w-full text-sm text-blue-600 font-medium hover:text-blue-700 hover:underline">
                       View All Transactions
                     </button>
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
