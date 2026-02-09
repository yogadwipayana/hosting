import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Menu01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

export function DocToc({ headings = [] }) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Filter headings to only include h2 and h3
  const tocHeadings = headings.filter(
    (h) => h.level === 2 || h.level === 3
  )

  if (tocHeadings.length === 0) return null

  const handleClick = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      // Update URL hash without jumping
      window.history.pushState(null, null, `#${id}`)
    }
  }

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "mb-8 p-4 rounded-lg border border-gray-200 bg-gray-50/50",
        "lg:sticky lg:top-24 lg:float-right lg:ml-8 lg:mb-4 lg:w-64",
        "lg:bg-white lg:shadow-sm"
      )}
    >
      {/* Mobile toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full lg:hidden"
        aria-expanded={isExpanded}
        aria-controls="toc-content"
      >
        <div className="flex items-center gap-2 font-semibold text-gray-900">
          <HugeiconsIcon icon={Menu01Icon} size={18} />
          On this page
        </div>
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          size={16}
          className={cn(
            "text-gray-400 transition-transform",
            isExpanded ? "rotate-90" : ""
          )}
        />
      </button>

      {/* Desktop header */}
      <div className="hidden lg:flex items-center gap-2 font-semibold text-gray-900 mb-3">
        <HugeiconsIcon icon={Menu01Icon} size={18} />
        On this page
      </div>

      {/* TOC Content */}
      <div
        id="toc-content"
        className={cn(
          "overflow-hidden transition-all",
          isExpanded ? "mt-3 max-h-96" : "max-h-0 lg:max-h-none lg:mt-0"
        )}
      >
        <ul className="space-y-1">
          {tocHeadings.map((heading) => (
            <li
              key={heading.id}
              className={cn(
                "text-sm",
                heading.level === 3 && "ml-4"
              )}
            >
              <button
                onClick={() => handleClick(heading.id)}
                className={cn(
                  "w-full text-left py-1.5 px-2 rounded transition-colors",
                  "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
