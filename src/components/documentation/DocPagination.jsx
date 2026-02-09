import { Link } from "react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

export function DocPagination({ prev, next }) {
  if (!prev && !next) return null

  return (
    <nav aria-label="Documentation pagination" className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Previous link */}
        {prev ? (
          <Link
            to={prev.href || `#${prev.id}`}
            onClick={prev.onClick}
            className={cn(
              "flex items-center gap-3 p-4 rounded-lg border border-gray-200",
              "hover:border-primary hover:bg-primary/5 transition-colors",
              "flex-1 sm:pr-8"
            )}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} className="text-gray-400 shrink-0" />
            <div className="text-left">
              <div className="text-sm text-gray-500 mb-1">Previous</div>
              <div className="font-medium text-gray-900 line-clamp-1">{prev.title}</div>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {/* Next link */}
        {next ? (
          <Link
            to={next.href || `#${next.id}`}
            onClick={next.onClick}
            className={cn(
              "flex items-center justify-end gap-3 p-4 rounded-lg border border-gray-200",
              "hover:border-primary hover:bg-primary/5 transition-colors",
              "flex-1 sm:pl-8"
            )}
          >
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Next</div>
              <div className="font-medium text-gray-900 line-clamp-1">{next.title}</div>
            </div>
            <HugeiconsIcon icon={ArrowRight01Icon} size={20} className="text-gray-400 shrink-0" />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </nav>
  )
}
