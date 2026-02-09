import { Menu } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

/**
 * DashboardTopbar Component
 * Reusable topbar for dashboard pages with user profile
 * 
 * @param {function} onMenuClick - Callback when mobile menu button is clicked
 */
export function DashboardTopbar({ onMenuClick }) {
  const { user } = useAuth()
  
  // Get user data or fallback to defaults
  const userName = user?.name || "User"
  const userEmail = user?.email || ""
  // Use Google profile picture if available, otherwise generate avatar from name
  const userAvatar = user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=3b82f6&color=fff`

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between lg:justify-end bg-white border-b px-4 lg:px-8">
      <button 
        onClick={onMenuClick}
        className="p-2 -ml-2 rounded-md hover:bg-gray-100 lg:hidden text-gray-600"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-semibold text-gray-900">{userName}</span>
          <span className="text-xs text-gray-500">{userEmail}</span>
        </div>
        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
          <img src={userAvatar} alt={userName} className="h-full w-full object-cover" />
        </div>
      </div>
    </header>
  )
}
