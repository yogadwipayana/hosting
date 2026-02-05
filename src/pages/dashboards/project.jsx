import { useState } from "react"
import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import {
  Folder,
  Plus,
  Globe,
  GitBranch,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from "lucide-react"

// Mock Data
const projects = [
  {
    id: 1,
    name: "landing-page-v1",
    framework: "React",
    domain: "landing-page.dockploy.com",
    status: "production",
    lastDeploy: "2 minutes ago",
    branch: "main",
    repo: "github.com/user/landing-page"
  },
  {
    id: 2,
    name: "backend-api",
    framework: "Node.js",
    domain: "api.dockploy.com",
    status: "production",
    lastDeploy: "1 hour ago",
    branch: "main",
    repo: "github.com/user/backend-api"
  },
  {
    id: 3,
    name: "dashboard-app",
    framework: "Vue",
    domain: "dash.dockploy.com",
    status: "failed",
    lastDeploy: "5 hours ago",
    branch: "dev",
    repo: "github.com/user/dashboard-app"
  }
]

const StatusBadge = ({ status }) => {
  const styles = {
    production: "bg-green-100 text-green-700 border-green-200",
    preview: "bg-blue-100 text-blue-700 border-blue-200",
    failed: "bg-red-100 text-red-700 border-red-200",
    building: "bg-yellow-100 text-yellow-700 border-yellow-200"
  }

  const labels = {
    production: "Production",
    preview: "Preview",
    failed: "Failed",
    building: "Building"
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

const ProjectCard = ({ project }) => {
  return (
    <div className="group relative rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Folder size={24} />
            </div>
            <div>
              <h3 className="font-semibold leading-none tracking-tight text-lg mb-1">{project.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <a href={`https://${project.domain}`} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                  {project.domain}
                  <Globe size={12} />
                </a>
              </div>
            </div>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
                <GitBranch size={16} />
                <span>{project.branch}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
                <Clock size={16} />
                <span>{project.lastDeploy}</span>
            </div>
        </div>
      </div>
       <div className="flex items-center justify-between border-t p-4 bg-muted/50 rounded-b-xl">
            <div className="text-xs text-muted-foreground font-mono">
                {project.framework}
            </div>
            <Link to={`/dashboard/project/${project.id}`} className="text-sm font-medium text-primary flex items-center gap-1 hover:underline">
                View Details <ArrowRight size={16} />
            </Link>
       </div>
    </div>
  )
}

const MainContent = () => {
    return (
        <main className="min-h-[calc(100vh-64px)] bg-gray-50/50 p-8">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                <h1 className="text-2xl font-bold text-foreground">Manage Projects</h1>
                <p className="text-muted-foreground">Kelola semua project aplikasi anda dalam satu dashboard</p>
                </div>
                <Link to="/dashboard/project/new" className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                <Plus size={18} />
                <span>New Project</span>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                 <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                         <h3 className="text-sm font-medium text-muted-foreground">Total Projects</h3>
                         <div className="p-2 bg-primary/10 text-primary rounded-lg">
                            <Folder size={20} />
                         </div>
                    </div>
                    <div className="text-3xl font-bold">{projects.length}</div>
                 </div>
                 <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                         <h3 className="text-sm font-medium text-muted-foreground">Active Deployments</h3>
                         <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                            <CheckCircle2 size={20} />
                         </div>
                    </div>
                    <div className="text-3xl font-bold">{projects.filter(p => p.status === 'production').length}</div>
                 </div>
                 <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                         <h3 className="text-sm font-medium text-muted-foreground">Failed Builds</h3>
                         <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                            <AlertCircle size={20} />
                         </div>
                    </div>
                    <div className="text-3xl font-bold">{projects.filter(p => p.status === 'failed').length}</div>
                 </div>
            </div>

            {/* Project List */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </main>
    )
}

export default function ProjectDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>Project Dashboard - DockPloy</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          activePage="/dashboard/proyek"
        />
        
        <div className="flex-1 lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
          <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />
          <MainContent />
        </div>
      </div>
    </>
  )
}
