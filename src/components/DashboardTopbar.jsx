/**
 * DashboardTopbar Component
 * Reusable topbar for dashboard pages with user profile
 * 
 * @param {string} userName - Display name of the user (optional, defaults to "User")
 * @param {string} userEmail - Email address of the user (optional)
 * @param {string} userAvatar - URL to user's avatar image (optional, defaults to placeholder)
 */
export function DashboardTopbar({ 
  userName = "User", 
  userEmail = "user@example.com",
  userAvatar = "https://github.com/shadcn.png" 
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-end bg-white border-b px-8">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end">
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
