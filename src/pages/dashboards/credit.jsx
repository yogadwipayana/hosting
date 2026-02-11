import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import { useCredit } from "@/hooks/useCredit"
import {
  CreditCard,
  History,
  Plus,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RefreshCw
} from "lucide-react"

const topUpOptions = [20000, 50000, 100000, 250000, 500000, 1000000]

export default function DashboardCredit() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [validationError, setValidationError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const {
    credits,
    transactions,
    loading,
    error,
    fetchCredits,
    createTopup,
    cancelTransaction,
    refresh
  } = useCredit()

  // Fetch credits on mount
  useEffect(() => {
    fetchCredits()
  }, [fetchCredits])

  const handleAmountChange = (val) => {
    setAmount(val)
    setSuccessMessage("")

    if (!val) {
      setValidationError("")
      return
    }

    if (val < 10000) {
      setValidationError("Minimal top up Rp 10.000")
    } else if (val % 5000 !== 0) {
      setValidationError("Jumlah harus kelipatan Rp 5.000")
    } else if (val > 10000000) {
      setValidationError("Maksimal top up Rp 10.000.000")
    } else {
      setValidationError("")
    }
  }

  const formatCurrency = (val) => {
    if (!val && val !== 0) return "Rp 0"
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val)
  }

  const formatDate = (dateString) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleString("id-ID", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'pending':
        return <Loader2 className="w-4 h-4 text-yellow-500 animate-spin" />
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-gray-400" />
      default:
        return null
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'success':
        return "bg-green-100 text-green-700"
      case 'failed':
        return "bg-red-100 text-red-700"
      case 'pending':
        return "bg-yellow-100 text-yellow-700"
      case 'cancelled':
        return "bg-gray-100 text-gray-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const handleTopup = async () => {
    if (validationError || !amount) return

    try {
      // Using QRIS as default payment method
      const result = await createTopup(amount, 'QRIS')
      setSuccessMessage(`Top-up berhasil dibuat! Silakan lakukan pembayaran sebelum ${formatDate(result.expiresAt)}`)
      setAmount("")
    } catch (err) {
      // Error is handled by the hook
    }
  }

  const handleCancelTransaction = async (transactionId) => {
    if (!confirm("Apakah Anda yakin ingin membatalkan transaksi ini?")) return

    try {
      await cancelTransaction(transactionId)
    } catch (err) {
      // Error is handled by the hook
    }
  }

  const recentTransactions = credits?.transactions || transactions || []

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

          <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-4 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Credit & Billing</h1>
              <button
                onClick={refresh}
                disabled={loading}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                title="Refresh"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-red-700">{error}</p>
                  <button
                    onClick={refresh}
                    className="text-sm text-red-600 hover:text-red-800 underline mt-1"
                  >
                    Coba lagi
                  </button>
                </div>
              </div>
            )}

            {/* Success Alert */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-green-700">{successMessage}</p>
                </div>
                <button
                  onClick={() => setSuccessMessage("")}
                  className="text-green-500 hover:text-green-700"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            )}

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
                    <h2 className="text-4xl font-bold mb-6">
                      {loading && !credits ? (
                        <Loader2 className="w-8 h-8 animate-spin" />
                      ) : (
                        formatCurrency(credits?.balance || 0)
                      )}
                    </h2>
                    <div className="flex gap-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                        <p className="text-xs text-blue-100">Monthly Usage</p>
                        <p className="font-semibold">
                          {formatCurrency(credits?.monthlyUsage || 0)}
                        </p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                        <p className="text-xs text-blue-100">Total Credits</p>
                        <p className="font-semibold">
                          {formatCurrency(credits?.totalCredits || 0)}
                        </p>
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

                  {/* Amount Options */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    {topUpOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAmountChange(opt)}
                        disabled={loading}
                        className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all disabled:opacity-50 ${
                          amount === opt
                            ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600"
                            : "border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-gray-50"
                        }`}
                      >
                        {formatCurrency(opt)}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Custom Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => handleAmountChange(Number(e.target.value))}
                          disabled={loading}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all disabled:bg-gray-50 ${
                            validationError
                              ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                          step="5000"
                          placeholder="Enter amount..."
                        />
                      </div>
                      {validationError && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {validationError}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        Minimal Rp 10.000, kelipatan Rp 5.000, maksimal Rp 10.000.000
                      </p>
                    </div>

                    <button
                      onClick={handleTopup}
                      disabled={!!validationError || !amount || loading}
                      className={`w-full font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        validationError || !amount || loading
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard size={18} />
                          Proceed to Payment
                        </>
                      )}
                    </button>
                    <p className="text-xs text-center text-gray-500">
                      Payment will be processed via QRIS.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Transaction History */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full max-h-[600px]">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 text-gray-600 rounded-lg">
                        <History size={20} />
                      </div>
                      <h3 className="font-bold text-gray-900">Recent Transactions</h3>
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto p-2">
                    {loading && recentTransactions.length === 0 ? (
                      <div className="flex items-center justify-center h-32">
                        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                      </div>
                    ) : recentTransactions.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <History className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No transactions yet</p>
                      </div>
                    ) : (
                      recentTransactions.map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-start justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0"
                        >
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            <div className={`p-2 rounded-full flex-shrink-0 ${
                              tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                            }`}>
                              {tx.type === 'credit' ? (
                                <ArrowDownLeft size={16} />
                              ) : (
                                <ArrowUpRight size={16} />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {tx.description}
                              </p>
                              <p className="text-xs text-gray-500">{formatDate(tx.date)}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadgeClass(tx.status)}`}>
                                  {tx.status}
                                </span>
                                {tx.status === 'pending' && (
                                  <button
                                    onClick={() => handleCancelTransaction(tx.id)}
                                    className="text-xs text-red-500 hover:text-red-700 underline"
                                  >
                                    Cancel
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className={`text-sm font-bold whitespace-nowrap ml-2 ${
                            tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'
                          }`}>
                            {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-4 border-t border-gray-100">
                    <button
                      onClick={refresh}
                      disabled={loading}
                      className="w-full text-sm text-blue-600 font-medium hover:text-blue-700 hover:underline disabled:opacity-50"
                    >
                      {loading ? 'Loading...' : 'Refresh Transactions'}
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
