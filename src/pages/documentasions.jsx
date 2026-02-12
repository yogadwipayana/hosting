import { useState, useMemo, useCallback, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  Menu01Icon, 
  Search01Icon, 
  BookOpen01Icon 
} from "@hugeicons/core-free-icons"

// Documentation components
import { DocLayout } from "@/components/documentation/DocLayout"
import { DocSidebar } from "@/components/documentation/DocSidebar"
import { DocSearch } from "@/components/documentation/DocSearch"
import { DocContent } from "@/components/documentation/DocContent"

// Hooks
import { useDocumentation } from "@/hooks/useDocumentation"
import { useDocSearch } from "@/hooks/useDocSearch"

export default function DocumentationsPage() {
  const [activeDocId, setActiveDocId] = useState("intro-what-is")
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  // Fetch documentation data
  const { docs, categories, isLoading, error, refetch } = useDocumentation()
  const { query, setQuery, results, isSearching } = useDocSearch(300)

  // Handle doc selection
  const handleDocSelect = useCallback((docId) => {
    setActiveDocId(docId)
    setShowMobileSidebar(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  // Handle search result selection
  const handleSearchSelect = useCallback((result) => {
    handleDocSelect(result.id)
    setQuery("")
  }, [handleDocSelect, setQuery])

  // Get active doc content
  const activeDoc = useMemo(() => {
    if (!docs.length) return null
    return docs.find(d => d.id === activeDocId) || docs[0]
  }, [activeDocId, docs])

  // Update pagination links for active doc
  const docWithPagination = useMemo(() => {
    if (!activeDoc || !categories.length) return null

    // Create a flat list of docs in order of categories
    const allDocs = categories.flatMap(cat => cat.docs || [])
    const currentIndex = allDocs.findIndex(d => d.id === activeDoc.id)

    const prev = currentIndex > 0 ? allDocs[currentIndex - 1] : null
    const next = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null

    return {
      ...activeDoc,
      prev: prev ? { id: prev.id, title: prev.title, onClick: () => handleDocSelect(prev.id) } : null,
      next: next ? { id: next.id, title: next.title, onClick: () => handleDocSelect(next.id) } : null,
      path: [
        { id: "docs", title: "Documentation", href: "/docs" },
        { id: activeDoc.id, title: activeDoc.title }
      ]
    }
  }, [activeDoc, categories, handleDocSelect])

  // Update active doc if docs are loaded and current activeDocId is not found (or initial load)
  useEffect(() => {
    if (!isLoading && docs.length > 0) {
        const currentDocExists = docs.find(d => d.id === activeDocId)
        if (!currentDocExists) {
             // Default to the first doc of the first category
             const firstDoc = categories[0]?.docs?.[0]
             if (firstDoc) setActiveDocId(firstDoc.id)
        }
    }
  }, [docs, isLoading, activeDocId, categories])


  return (
    <>
      <Helmet>
        <title>{activeDoc ? `${activeDoc.title} - Dokumentasi` : "Dokumentasi - BelajarHosting"}</title>
        <meta name="description" content="Dokumentasi lengkap dan panduan teknis untuk menggunakan layanan BelajarHosting." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Modern Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
               <div className="bg-primary/10 p-2 rounded-lg lg:hidden">
                 <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMobileSidebar(true)}
                    className="hover:bg-transparent p-0 h-auto"
                 >
                   <HugeiconsIcon icon={Menu01Icon} size={20} className="text-primary" />
                 </Button>
               </div>
               <div className="flex items-center gap-2">
                 <div className="bg-primary/10 p-2 rounded-lg hidden lg:flex">
                     <HugeiconsIcon icon={BookOpen01Icon} size={20} className="text-primary" />
                 </div>
                 <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
                   Documentation
                 </h1>
               </div>
            </div>

            <div className="flex-1 max-w-xl">
               <DocSearch
                 query={query}
                 onQueryChange={setQuery}
                 results={results}
                 isSearching={isSearching}
                 onResultSelect={handleSearchSelect}
                 placeholder="Search documentation..."
               />
            </div>
            
             <div className="w-10 lg:w-auto" /> {/* Spacer/Placeholder for balance */}
          </div>
        </header>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 flex-1">
             <DocLayout
                showMobileSidebar={showMobileSidebar}
                onToggleSidebar={() => setShowMobileSidebar(!showMobileSidebar)}
                sidebar={
                    <div className="py-6">
                        <DocSidebar
                            categories={categories}
                            activeDocId={activeDocId}
                            onDocSelect={handleDocSelect}
                            onClose={() => setShowMobileSidebar(false)}
                            showMobileClose={true}
                        />
                    </div>
                }
            >
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[calc(100vh-8rem)] my-6 mx-auto max-w-5xl">
                    <DocContent
                        doc={docWithPagination}
                        isLoading={isLoading}
                        error={error}
                        onRetry={refetch}
                    />
                </div>
            </DocLayout>
        </div>
        
        <div className="mt-auto">
             <Footer />
        </div>
      </div>
    </>
  )
}
