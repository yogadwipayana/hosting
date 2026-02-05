
import { useState } from "react"
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import { 
  Bookmark,
  ExternalLink,
  Search
} from "lucide-react"

// Mock Data
const bookmarks = [
  {
    id: 1,
    title: "Dokploy Documentation",
    url: "https://dokploy.com/docs",
    description: "Official documentation for Dokploy deployment tool.",
    category: "Documentation",
    dateAdded: "2024-03-15"
  },
  {
    id: 2,
    title: "N8n Workflows",
    url: "https://n8n.io",
    description: "Workflow automation tool for technical people.",
    category: "Tools",
    dateAdded: "2024-03-14"
  },
  {
    id: 3,
    title: "PostgreSQL Guide",
    url: "https://postgresql.org",
    description: "The world's most advanced open source relational database.",
    category: "Database",
    dateAdded: "2024-03-10"
  },
  {
    id: 4,
    title: "React Icons",
    url: "https://react-icons.github.io/react-icons",
    description: "Include popular icons in your React projects easily with react-icons.",
    category: "Development",
    dateAdded: "2024-03-05"
  }
]

const MainContent = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookmarks</h1>
          <p className="text-gray-500">Kumpulan link dan resource favorit anda</p>
        </div>
        <div className="flex items-center gap-2">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Cari bookmark..." 
                    className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full sm:w-64 text-sm"
                />
            </div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                <Bookmark size={18} />
                <span>Add New</span>
            </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id} className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all hover:border-blue-200">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Bookmark size={24} />
                </div>
                <div className="flex gap-2">
                     <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        {bookmark.category}
                     </span>
                </div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {bookmark.title}
            </h3>
            <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                {bookmark.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <span className="text-xs text-gray-400">
                    Added {bookmark.dateAdded}
                </span>
                <a 
                    href={bookmark.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                    Visit Link
                    <ExternalLink size={14} />
                </a>
            </div>
          </div>
        ))}

        {/* Add New Placeholder Card */}
        <button className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-gray-400 hover:text-blue-600 min-h-[200px]">
            <div className="p-4 rounded-full bg-gray-50 mb-4 group-hover:bg-white">
                <PlusIcon className="h-8 w-8" />
            </div>
            <span className="font-medium">Tambah Bookmark Baru</span>
        </button>
      </div>
    </main>
  )
}

function PlusIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}

export default function BookmarkDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>Bookmarks - BelajarHosting</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          activePage="/dashboard/bookmark"
        />
        
        <div className="flex-1 lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
          <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />
          <MainContent />
        </div>
      </div>
    </>
  )
}
