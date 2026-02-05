import { Link } from "react-router"
import {
  LayoutDashboard,
  Folder,
  Cloud,
  Database,
  Workflow,
  GraduationCap,
  Bookmark,
  CreditCard,
  Settings,
  HelpCircle,
} from "lucide-react"
import { LogoMark } from "@/components/Logo"

// Menu configuration
const menuItems = [
  {
    title: "UTAMA",
    items: [
      { id: "ringkasan", name: "Ringkasan", icon: LayoutDashboard, href: "/dashboard" },
      { id: "proyek", name: "Proyek Saya", icon: Folder, href: "/dashboard/proyek" },
    ],
  },
  {
    title: "PRODUK",
    items: [
      { id: "hosting", name: "Manage Hosting", icon: Cloud, href: "/dashboard/hosting" },
      { id: "database", name: "Database", icon: Database, href: "/dashboard/database" },
      { id: "automation", name: "Automation (n8n)", icon: Workflow, href: "/dashboard/automation" },
    ],
  },
  {
    title: "EDUKASI",
    items: [
      { id: "kelas", name: "Kelas Saya", icon: GraduationCap, href: "/dashboard/kelas" },
      { id: "bookmark", name: "Bookmark", icon: Bookmark, href: "/dashboard/bookmark" },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      { id: "credit", name: "Credit", icon: CreditCard, href: "/dashboard/credit" },
      { id: "pengaturan", name: "Pengaturan", icon: Settings, href: "/dashboard/pengaturan" },
      { id: "bantuan", name: "Bantuan", icon: HelpCircle, href: "/dashboard/bantuan" },
    ],
  },
]

/**
 * DashboardSidebar Component
 * Reusable sidebar for dashboard pages with navigation menu
 * 
 * @param {string} activeMenuItem - The ID of the currently active menu item (e.g., "ringkasan", "proyek")
 * @param {boolean} isOpen - Whether the sidebar is open on mobile
 * @param {function} onClose - Callback to close the sidebar
 */
export function DashboardSidebar({ activeMenuItem, activePage, isOpen = false, onClose }) {
  // Helper to determine if an item is active
  const isActive = (item) => {
    if (activePage) {
      // Direct path match
      if (item.href === activePage) return true;
      // Handle sub-paths (optional/future-proof)
      // if (activePage.startsWith(item.href) && item.href !== "/dashboard") return true;
    }
    // Fallback to ID match
    return item.id === activeMenuItem;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside 
        className={`
          fixed left-0 top-0 z-50 h-screen w-64 border-r bg-white transition-transform duration-300 flex flex-col
          lg:translate-x-0 lg:z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-16 items-center px-6 border-b shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <LogoMark size={32} />
            <span className="text-xl font-bold text-gray-900">Belajar Hosting</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6">
          {menuItems.map((section, index) => (
            <div key={index} className="mb-6 px-4">
              <h3 className="mb-2 px-2 text-xs font-semibold text-gray-500">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    to={item.href}
                    onClick={onClose} // Auto close on mobile navigation
                    className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors ${
                      isActive(item)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Close Button Footer */}
        <div className="p-4 border-t lg:hidden mt-auto">
          <button 
            onClick={onClose}
            className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <img 
              src="/images/sidebar-hide-svgrepo-com.svg" 
              alt="Close Sidebar" 
              className="h-5 w-5"
            />
            <span>Tutup Sidebar</span>
          </button>
        </div>
      </aside>
    </>
  )
}
