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
    ],
  },
]

/**
 * DashboardSidebar Component
 * Reusable sidebar for dashboard pages with navigation menu
 * 
 * @param {string} activeMenuItem - The ID of the currently active menu item (e.g., "ringkasan", "proyek")
 */
export function DashboardSidebar({ activeMenuItem = "ringkasan" }) {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/" className="flex items-center gap-2">
          <LogoMark size={32} />
          <span className="text-xl font-bold text-gray-900">Belajar Hosting</span>
        </Link>
      </div>
      
      <div className="h-[calc(100vh-64px)] overflow-y-auto py-6">
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
                  className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors ${
                    item.id === activeMenuItem
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
    </aside>
  )
}
