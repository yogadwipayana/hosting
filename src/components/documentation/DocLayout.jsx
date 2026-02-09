import { cn } from "@/lib/utils"

export function DocLayout({ children, sidebar, showMobileSidebar, onToggleSidebar }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md"
      >
        Skip to main content
      </a>

      {/* Mobile sidebar overlay */}
      {showMobileSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggleSidebar}
          aria-hidden="true"
        />
      )}

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:sticky lg:top-0 lg:h-screen",
            "w-72 bg-white border-r border-gray-200 z-50",
            "transition-transform duration-300 ease-in-out",
            showMobileSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
          aria-label="Documentation sidebar"
        >
          {sidebar}
        </aside>

        {/* Main Content */}
        <main id="main-content" className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
