import { useState, useEffect } from "react"
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ToolsSidebar } from "@/components/ToolsSidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import DomainPrice from "@/components/DomainPrice"
import { domainApi } from "@/lib/api"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Search01Icon,
  CheckmarkCircle02Icon,
  CancelCircleIcon,
  GlobeIcon,
} from "@hugeicons/core-free-icons"
import { Loader2, AlertCircle, Calendar, User, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react"

const ITEMS_PER_PAGE = 20

// Breadcrumb Component
function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-gray-400">/</span>}
          {item.href ? (
            <Link to={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

export default function DomainCheckPage() {
  const [domain, setDomain] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState("all") // all, available, registered, unknown
  const [pagination, setPagination] = useState(null)
  const [domainName, setDomainName] = useState("")

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [filter])

  const fetchDomains = async (page = 1) => {
    const cleanDomain = domain.toLowerCase().split('.')[0]
    setDomainName(cleanDomain)

    const response = await domainApi.checkDomainAllTlds(cleanDomain, { page, limit: ITEMS_PER_PAGE })

    if (response.status === 'success') {
      setResult(response.data.results)
      setPagination(response.data.pagination)
    } else {
      setError(response.message || 'Failed to check domain')
    }
  }

  const handleCheck = async (e) => {
    e.preventDefault()
    if (!domain) return

    setLoading(true)
    setError(null)
    setResult(null)
    setCurrentPage(1)
    setFilter("all")
    setPagination(null)

    try {
      await fetchDomains(1)
    } catch (err) {
      setError(err.message || 'An error occurred while checking the domain')
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = async (newPage) => {
    if (newPage === currentPage || !domainName) return

    setLoading(true)
    setCurrentPage(newPage)

    try {
      await fetchDomains(newPage)
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err.message || 'An error occurred while loading page')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Use server-side paginated results directly
  const paginatedResults = result || []
  const totalPages = pagination?.totalPages || 1
  const totalResults = pagination?.total || 0

  // Stats from full result set (would need separate endpoint for accurate filtered counts with server pagination)
  // For now, show counts from current page only or use placeholder values
  const stats = result ? {
    total: pagination?.total || result.length,
    available: result.filter(r => r.available === true).length,
    registered: result.filter(r => r.available === false).length,
    unknown: result.filter(r => r.available === null).length,
  } : null

  const FilterTab = ({ value, label, count, active }) => (
    <button
      onClick={() => setFilter(value)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        active
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {label}
      {count > 0 && (
        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
          active ? "bg-white/20" : "bg-gray-200"
        }`}>
          {count}
        </span>
      )}
    </button>
  )

  return (
    <>
      <Helmet>
        <title>Domain Checker & WHOIS - Alat Hosting</title>
        <meta name="description" content="Cek ketersediaan nama domain dan informasi WHOIS lengkap. Temukan domain impian Anda sekarang." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-gray-50 pt-8 pb-16">
        <div className="container mx-auto px-4">
          
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Alat", href: "/alat" },
              { label: "Domain Checker", href: null },
            ]}
          />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <ToolsSidebar activeToolId="domain-checker" />

            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
                  Domain Checker
                </h1>
                <p className="text-lg text-muted-foreground">
                  Cek ketersediaan nama domain di 98+ ekstensi TLD.
                  Temukan domain ideal untuk brand atau bisnis Anda.
                </p>
              </div>

              {/* Check Card */}
              <Card className="mb-8 border-gray-200 shadow-sm">
                <CardContent className="pt-6">
                  <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <HugeiconsIcon icon={GlobeIcon} size={20} />
                      </div>
                      <Input
                        type="text"
                        placeholder="Masukkan nama domain (contoh: mybrand)"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="pl-10 h-12 text-base"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading || !domain}
                      className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Memeriksa domain...
                        </>
                      ) : (
                        <>
                          <HugeiconsIcon icon={Search01Icon} size={18} className="mr-2" />
                          Cek Domain
                        </>
                      )}
                    </Button>
                  </form>

                  {error && (
                    <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-start gap-3">
                      <AlertCircle size={20} className="mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-sm">Error</h4>
                        <p className="text-sm">{error}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>


              {/* Note: Filter disabled with server pagination - would need server-side filtering */}

              {/* Result Section */}
              {result && (
                <div className="space-y-3 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {paginatedResults.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      Tidak ada hasil untuk filter ini
                    </div>
                  ) : (
                    paginatedResults.map((item, index) => (
                      <div
                        key={index}
                        className={`rounded-lg border shadow-sm overflow-hidden ${
                          item.available === null
                            ? "bg-amber-50 border-amber-200"
                            : item.available
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                        }`}
                      >
                        {/* Main Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4">
                          <div className="flex items-center gap-3">
                            {item.available === null ? (
                              <HelpCircle className="text-amber-600 h-6 w-6 shrink-0" />
                            ) : item.available ? (
                              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="text-green-600 h-6 w-6 shrink-0" />
                            ) : (
                              <HugeiconsIcon icon={CancelCircleIcon} className="text-red-600 h-6 w-6 shrink-0" />
                            )}
                            <div>
                              <span className={`font-semibold text-base ${
                                item.available === null
                                  ? "text-amber-800"
                                  : item.available
                                    ? "text-green-800"
                                    : "text-red-800"
                              }`}>
                                {item.domain}
                              </span>
                              <p className={`text-sm ${
                                item.available === null
                                  ? "text-amber-600"
                                  : item.available
                                    ? "text-green-600"
                                    : "text-red-600"
                              }`}>
                                {item.available === null
                                  ? "Status tidak diketahui"
                                  : item.available
                                    ? "Tersedia!"
                                    : "Telah terdaftar"
                                }
                              </p>
                            </div>
                          </div>

                          {item.available === null ? (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-amber-300 text-amber-700 hover:bg-amber-100 min-w-[100px] font-semibold cursor-not-allowed"
                              disabled
                            >
                              CEK MANUAL
                            </Button>
                          ) : item.available ? (
                            <Link to="/dashboard/hosting">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white min-w-[100px] font-semibold"
                              >
                                BELI
                              </Button>
                            </Link>
                          ) : (
                            <a
                              href={`https://who.is/whois/${item.domain}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-300 text-red-700 hover:bg-red-100 min-w-[100px] font-semibold"
                              >
                                WHOIS
                              </Button>
                            </a>
                          )}
                        </div>

                        {/* Message for Unknown Status */}
                        {item.available === null && item.message && (
                          <div className="px-4 pb-4 pt-0">
                            <div className="bg-white/60 rounded-md p-3 text-sm text-amber-700">
                              <p>{item.message}</p>
                              <p className="mt-1 text-xs text-amber-600">
                                Silakan cek manual melalui{' '}
                                <a
                                  href={`https://who.is/whois/${item.domain}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline hover:text-amber-800"
                                >
                                  who.is
                                </a>
                              </p>
                            </div>
                          </div>
                        )}

                        {/* WHOIS Details for Registered Domains */}
                        {item.available === false && item.registrar && (
                          <div className="px-4 pb-4 pt-0">
                            <div className="bg-white/60 rounded-md p-3 text-sm space-y-2">
                              {item.registrar && (
                                <div className="flex items-center gap-2 text-gray-700">
                                  <User size={14} className="text-gray-500" />
                                  <span className="font-medium">Registrar:</span>
                                  <span>{item.registrar}</span>
                                </div>
                              )}
                              {item.created_date && (
                                <div className="flex items-center gap-2 text-gray-700">
                                  <Calendar size={14} className="text-gray-500" />
                                  <span className="font-medium">Dibuat:</span>
                                  <span>{formatDate(item.created_date)}</span>
                                </div>
                              )}
                              {item.expiry_date && (
                                <div className="flex items-center gap-2 text-gray-700">
                                  <Calendar size={14} className="text-gray-500" />
                                  <span className="font-medium">Kadaluarsa:</span>
                                  <span>{formatDate(item.expiry_date)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Pagination */}
              {result && totalPages > 1 && (
                <div className="flex items-center justify-between mb-12">
                  <p className="text-sm text-gray-500">
                    Halaman {currentPage} dari {totalPages} ({totalResults} total)
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || loading}
                      className="px-3"
                    >
                      <ChevronLeft size={16} />
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page =>
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      )
                      .map((page, index, array) => (
                        <div key={page} className="flex items-center">
                          {index > 0 && array[index - 1] !== page - 1 && (
                            <span className="px-2 text-gray-400">...</span>
                          )}
                          <Button
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            disabled={loading}
                            className={`min-w-[40px] ${
                              currentPage === page
                                ? "bg-blue-600 hover:bg-blue-700"
                                : ""
                            }`}
                          >
                            {page}
                          </Button>
                        </div>
                      ))
                    }

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || loading}
                      className="px-3"
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              )}

              {/* Domain Pricing Reference */}
              <div className="mt-12">
                <DomainPrice />
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
