import { Link } from "react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Home01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"

export function DocBreadcrumbs({ path = [] }) {
  if (!path || path.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {/* Home link */}
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 text-gray-500 hover:text-primary transition-colors"
          >
            <HugeiconsIcon icon={Home01Icon} size={16} />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        <li aria-hidden="true">
          <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="text-gray-400" />
        </li>

        {/* Documentation link */}
        <li>
          <Link
            to="/docs"
            className="text-gray-500 hover:text-primary transition-colors"
          >
            Docs
          </Link>
        </li>

        {/* Path items */}
        {path.map((item, index) => {
          const isLast = index === path.length - 1

          return (
            <li key={item.id || index} className="flex items-center gap-2">
              <span aria-hidden="true">
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="text-gray-400" />
              </span>
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-medium text-gray-900 truncate max-w-[200px] sm:max-w-xs"
                >
                  {item.title}
                </span>
              ) : (
                <Link
                  to={item.href || `#${item.id}`}
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
