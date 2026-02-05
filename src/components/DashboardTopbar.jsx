import { Menu } from "lucide-react"

/**
 * DashboardTopbar Component
 * Reusable topbar for dashboard pages with user profile
 * 
 * @param {string} userName - Display name of the user (optional, defaults to "User")
 * @param {string} userEmail - Email address of the user (optional)
 * @param {string} userAvatar - URL to user's avatar image (optional, defaults to placeholder)
 * @param {function} onMenuClick - Callback when mobile menu button is clicked
 */
export function DashboardTopbar({ 
  userName = "User", 
  userEmail = "user@example.com",
  userAvatar = "https://github.com/shadcn.png",
  onMenuClick
}) {
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
