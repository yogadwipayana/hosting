import { HugeiconsIcon } from "@hugeicons/react"
import {
  BookOpen01Icon,
  Rocket01Icon,
  Database01Icon,
  Globe02Icon,
  Shield02Icon,
  ArrowRight01Icon,
  AlertCircleIcon,
  RefreshIcon,
  Clock01Icon,
  File02Icon
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { DocBreadcrumbs } from "./DocBreadcrumbs"
import { DocPagination } from "./DocPagination"
import { DocToc } from "./DocToc"
import { cn } from "@/lib/utils"

// Format date helper
function formatDate(dateString) {
  if (!dateString) return "Unknown"
  const date = new Date(dateString)
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

// Calculate reading time
function calculateReadingTime(content) {
  if (!content) return null
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min`
}

// Loading skeleton component
function DocContentSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Breadcrumbs skeleton */}
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-8" />

      {/* Header skeleton */}
      <div className="h-10 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-8" />

      {/* Meta skeleton */}
      <div className="flex gap-4 mb-8">
        <div className="h-4 bg-gray-200 rounded w-32" />
        <div className="h-4 bg-gray-200 rounded w-24" />
      </div>

      {/* Content skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-4/5" />
      </div>
    </div>
  )
}

// Error state component
function DocError({ message, onRetry }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <HugeiconsIcon icon={AlertCircleIcon} size={32} className="text-red-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Failed to load documentation
        </h2>
        <p className="text-gray-600 mb-6">{message || "Something went wrong"}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            <HugeiconsIcon icon={RefreshIcon} size={16} className="mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
}

// Empty state component
function DocEmptyState() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <HugeiconsIcon icon={File02Icon} size={32} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          No documentation selected
        </h2>
        <p className="text-gray-600">
          Select a topic from the sidebar to view documentation
        </p>
      </div>
    </div>
  )
}

export function DocContent({ doc, isLoading, error, onRetry }) {
  if (isLoading) return <DocContentSkeleton />
  if (error) return <DocError message={error} onRetry={onRetry} />
  if (!doc) return <DocEmptyState />

  const readingTime = doc.readingTime || calculateReadingTime(doc.content)

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      {doc.path && <DocBreadcrumbs path={doc.path} />}

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {doc.title}
        </h1>
        {doc.description && (
          <p className="text-xl text-gray-600">{doc.description}</p>
        )}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
          {doc.updatedAt && (
            <span className="flex items-center gap-1">
              <HugeiconsIcon icon={Clock01Icon} size={14} />
              Last updated: {formatDate(doc.updatedAt)}
            </span>
          )}
          {readingTime && (
            <span className="flex items-center gap-1">
              <HugeiconsIcon icon={BookOpen01Icon} size={14} />
              {readingTime} read
            </span>
          )}
        </div>
      </header>

      {/* Table of Contents */}
      {doc.headings && doc.headings.length > 0 && (
        <DocToc headings={doc.headings} />
      )}

      {/* Content */}
      {doc.content ? (
        <div
          className={cn(
            "prose prose-lg max-w-none",
            "prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:text-gray-900",
            "prose-p:text-gray-700 prose-p:leading-relaxed",
            "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
            "prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono",
            "prose-pre:bg-gray-900 prose-pre:text-white prose-pre:rounded-lg prose-pre:p-4",
            "prose-ul:list-disc prose-ul:pl-6",
            "prose-ol:list-decimal prose-ol:pl-6",
            "prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600",
            "prose-img:rounded-lg prose-img:shadow-md",
            "prose-hr:border-gray-200"
          )}
          dangerouslySetInnerHTML={{ __html: doc.content }}
        />
      ) : (
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600">No content available for this documentation.</p>
        </div>
      )}

      {/* Pagination */}
      {(doc.prev || doc.next) && (
        <DocPagination prev={doc.prev} next={doc.next} />
      )}
    </article>
  )
}
