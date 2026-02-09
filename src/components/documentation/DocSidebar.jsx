import { Link } from "react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BookOpen01Icon,
  Rocket01Icon,
  Database01Icon,
  Globe02Icon,
  Shield02Icon,
  ArrowRight01Icon,
  Search01Icon,
  CheckmarkCircle02Icon,
  Menu01Icon,
  ArrowLeft01Icon
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

// Default icon mapping for categories
const categoryIcons = {
  "Introduction": BookOpen01Icon,
  "Getting Started": Rocket01Icon,
  "Deployments": Rocket01Icon,
  "Databases": Database01Icon,
  "Domain & SSL": Globe02Icon,
  "Security": Shield02Icon,
}

function getCategoryIcon(categoryName) {
  return categoryIcons[categoryName] || BookOpen01Icon
}

export function DocSidebar({
  categories,
  activeDocId,
  onDocSelect,
  onClose,
  showMobileClose = false
}) {
  // Transform categories to ensure they have the expected structure
  const normalizedCategories = categories.map(cat => ({
    id: cat.id || cat.slug || cat.name,
    name: cat.name || cat.title,
    description: cat.description,
    docs: cat.docs || cat.items || []
  }))

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <HugeiconsIcon icon={BookOpen01Icon} size={20} className="text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-gray-900">Documentation</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4" aria-label="Documentation navigation">
        {normalizedCategories.length === 0 ? (
          <div className="text-sm text-gray-500 text-center py-8">
            No categories available
          </div>
        ) : (
          <Accordion
            type="multiple"
            defaultValue={normalizedCategories.map(c => c.id)}
            className="space-y-2"
          >
            {normalizedCategories.map(category => {
              const Icon = getCategoryIcon(category.name)
              return (
                <AccordionItem
                  key={category.id}
                  value={category.id}
                  className="border-none"
                >
                  <AccordionTrigger className="py-2 hover:no-underline text-sm font-semibold text-gray-900 hover:text-gray-700">
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon icon={Icon} size={18} className="text-primary" />
                      {category.name}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1 border-l-2 border-gray-100 ml-2.5 pl-4">
                      {category.docs.map(doc => (
                        <li key={doc.id}>
                          <button
                            onClick={() => onDocSelect(doc.id)}
                            aria-current={activeDocId === doc.id ? 'page' : undefined}
                            className={cn(
                              "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                              activeDocId === doc.id
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            )}
                          >
                            {doc.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        )}
      </nav>

      {/* Mobile close button */}
      {showMobileClose && (
        <div className="lg:hidden p-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose} className="w-full">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} className="mr-2" />
            Close Menu
          </Button>
        </div>
      )}
    </div>
  )
}
