import { useState, useRef, useEffect } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function DocSearch({
  query,
  onQueryChange,
  results,
  isSearching,
  onResultSelect,
  placeholder = "Cari dokumentasi..."
}) {
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close dropdown on Escape key
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false)
        inputRef.current?.blur()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleInputChange = (e) => {
    onQueryChange(e.target.value)
    setIsOpen(true)
  }

  const handleResultClick = (result) => {
    onResultSelect(result)
    setIsOpen(false)
    onQueryChange("")
  }

  const showResults = isOpen && (results.length > 0 || (query && !isSearching))

  return (
    <div ref={containerRef} className="relative w-full" role="search">
      <label htmlFor="doc-search" className="sr-only">
        Search documentation
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          {isSearching ? (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          ) : (
            <HugeiconsIcon icon={Search01Icon} size={20} className="text-gray-400" />
          )}
        </div>
        <Input
          ref={inputRef}
          id="doc-search"
          type="search"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={showResults}
          className="pl-12 h-14 bg-white shadow-sm border-gray-200 focus:border-primary focus:ring-primary w-full rounded-xl text-base"
        />
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div
          id="search-results"
          role="listbox"
          aria-label="Search results"
          className={cn(
            "absolute top-full left-0 right-0 mt-2",
            "bg-white rounded-xl shadow-lg border border-gray-200",
            "max-h-96 overflow-y-auto z-50"
          )}
        >
          {results.length > 0 ? (
            <ul className="py-2">
              {results.map((result) => (
                <li key={result.id} role="option">
                  <button
                    onClick={() => handleResultClick(result)}
                    className={cn(
                      "w-full text-left px-4 py-3",
                      "hover:bg-gray-50 transition-colors",
                      "flex items-center justify-between group"
                    )}
                  >
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-primary">
                        {result.title}
                      </div>
                      {result.category && (
                        <div className="text-sm text-gray-500">
                          in {result.category}
                        </div>
                      )}
                    </div>
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={16}
                      className="text-gray-400 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : query && !isSearching ? (
            <div className="px-4 py-8 text-center text-gray-500">
              No results found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
