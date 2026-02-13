import { Link, useLocation, useNavigate } from "react-router"
import {
  LayoutDashboard,
  Users,
  FileText,
  GraduationCap,
  CreditCard,
  Settings,
  LogOut,
  X,
  Shield,
  Package,
} from "lucide-react"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import { cn } from "@/lib/utils"

// Menu configuration
const menuItems = [
  {
    title: "DASHBOARD",
    items: [
      { id: "overview", name: "Overview", icon: LayoutDashboard, href: "/admin" },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { id: "users", name: "Users", icon: Users, href: "/admin/users" },
      { id: "blogs", name: "Blogs", icon: FileText, href: "/admin/blogs" },
      { id: "classes", name: "Classes", icon: GraduationCap, href: "/admin/classes" },
      { id: "transactions", name: "Transactions", icon: CreditCard, href: "/admin/transactions" },
      { id: "orders", name: "Orders", icon: Package, href: "/admin/orders" },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { id: "settings", name: "Settings", icon: Settings, href: "/admin/settings" },
    ],
  },
]

/**
 * AdminSidebar Component
 * Light-themed sidebar for admin panel
 *
 * @param {boolean} isOpen - Whether the sidebar is open on mobile
 * @param {function} onClose - Callback to close the sidebar
 */
export function AdminSidebar({ isOpen = false, onClose }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, admin } = useAdminAuth()

  // Handle logout
  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  // Helper to determine if an item is active
  const isActive = (href) => {
    if (href === "/admin") {
      return location.pathname === "/admin" || location.pathname === "/admin/"
    }
    return location.pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 border-r border-border bg-card transition-transform duration-300 flex flex-col",
          "lg:translate-x-0 lg:z-40",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center px-6 border-b border-border shrink-0">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-lg font-bold text-foreground">Admin</span>
              <span className="text-xs text-muted-foreground block -mt-1">BelajarHosting</span>
            </div>
          </Link>
        </div>

        {/* Admin Info */}
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {admin?.name?.charAt(0)?.toUpperCase() || admin?.email?.charAt(0)?.toUpperCase() || "A"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {admin?.name || admin?.email}
              </p>
              <p className="text-xs text-muted-foreground capitalize">{admin?.role?.toLowerCase()}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          {menuItems.map((section, index) => (
            <div key={index} className="mb-6 px-3">
              <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className={cn(
                      "h-4 w-4",
                      isActive(item.href) ? "text-primary" : "text-muted-foreground"
                    )} />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="p-3 border-t border-border mt-auto">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Mobile Close Button */}
        <div className="p-3 border-t border-border lg:hidden">
          <button
            onClick={onClose}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Close Sidebar</span>
          </button>
        </div>
      </aside>
    </>
  )
}
