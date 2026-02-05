import { useState } from "react"
import { useParams, Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import {
  ArrowLeft,
  Globe,
  GitBranch,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  TerminalSquare,
  Settings,
  MoreVertical,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock Data (duplicated for demo)
const projects = [
  {
    id: 1,
    name: "landing-page-v1",
    framework: "React",
    domain: "landing-page.dockploy.com",
    status: "production",
    lastDeploy: "2 minutes ago",
    branch: "main",
    repo: "github.com/user/landing-page",
    commitMessage: "fix: update hero section responsive layout",
    commitHash: "8a2b9d4"
  },
  {
    id: 2,
    name: "backend-api",
    framework: "Node.js",
    domain: "api.dockploy.com",
    status: "production",
    lastDeploy: "1 hour ago",
    branch: "main",
    repo: "github.com/user/backend-api",
    commitMessage: "feat: add user authentication endpoint",
    commitHash: "c3f1e9a"
  },
  {
    id: 3,
    name: "dashboard-app",
    framework: "Vue",
    domain: "dash.dockploy.com",
    status: "failed",
    lastDeploy: "5 hours ago",
    branch: "dev",
    repo: "github.com/user/dashboard-app",
    commitMessage: "chore: update dependencies",
    commitHash: "b7d5c2e"
  }
]

const deployments = [
  { id: "dep-1", status: "production", commit: "8a2b9d4", message: "fix: update hero section", time: "2m ago", duration: "45s" },
  { id: "dep-2", status: "production", commit: "7c3d1e2", message: "feat: add contact form", time: "1d ago", duration: "52s" },
  { id: "dep-3", status: "failed", commit: "9g8h7j6", message: "fix: typos", time: "2d ago", duration: "12s" },
]

const StatusBadge = ({ status }) => {
  const styles = {
    production: "bg-green-100 text-green-700 border-green-200",
    preview: "bg-blue-100 text-blue-700 border-blue-200",
    failed: "bg-red-100 text-red-700 border-red-200",
    building: "bg-yellow-100 text-yellow-700 border-yellow-200"
  }

  const labels = {
    production: "Ready",
    preview: "Ready",
    failed: "Error",
    building: "Building"
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

const MainContent = () => {
  const { id } = useParams()
  // Mock finding project by ID (ensure ID is compared correctly, simpler for mock to just grab first or find)
  const project = projects.find(p => p.id === parseInt(id)) || projects[0] 

  if (!project) return <div>Project not found</div>

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50/50 p-8">
      {/* Header */}
      <div className="flex flex-col gap-6 mb-8">
        <Link to="/dashboard/proyek" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} className="mr-1" /> Back to Projects
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
              <StatusBadge status={project.status} />
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
               <a href={`https://${project.domain}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                 <Globe size={14} />
                 {project.domain}
               </a>
               <span className="flex items-center gap-1.5">
                 <GitBranch size={14} />
                 {project.branch}
               </span>
               <span className="flex items-center gap-1.5">
                 <Clock size={14} />
                 {project.lastDeploy}
               </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw size={14} className="mr-2" /> Redeploy
            </Button>
            <Button variant="default" size="sm">
              <ExternalLink size={14} className="mr-2" /> Visit
            </Button>
            <Button variant="ghost" size="icon">
              <Settings size={18} />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Column */}
         <div className="lg:col-span-2 space-y-6">
            
            {/* Git Info Card */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Production Deployment</h3>
              <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg border">
                 <div className="mt-1">
                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                     <GitBranch size={16} />
                   </div>
                 </div>
                 <div className="flex-1">
                    <p className="font-medium text-foreground">{project.commitMessage}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">{project.commitHash}</span>
                      <span>•</span>
                      <span>Committed by user</span>
                      <span>•</span>
                      <span>{project.lastDeploy}</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Deployment History */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                <div className="p-6 border-b">
                   <h3 className="text-lg font-semibold">Deployments</h3>
                </div>
                <div className="divide-y">
                   {deployments.map(dep => (
                      <div key={dep.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                          <div className="flex items-center gap-4">
                             <StatusBadge status={dep.status} />
                             <div>
                                <p className="text-sm font-medium text-foreground">{dep.message}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                   <span className="font-mono">{dep.commit}</span>
                                   <span>•</span>
                                   <span>{dep.time}</span>
                                </div>
                             </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                             {dep.duration}
                          </div>
                      </div>
                   ))}
                </div>
                <div className="p-4 border-t text-center">
                   <button className="text-sm text-primary hover:underline font-medium">View All Deployments</button>
                </div>
            </div>

         </div>

         {/* Sidebar Column */}
         <div className="space-y-6">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
               <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Project Details</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                     <span className="text-sm text-muted-foreground">Framework</span>
                     <span className="text-sm font-medium flex items-center gap-1">
                        {project.framework}
                     </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                     <span className="text-sm text-muted-foreground">Region</span>
                     <span className="text-sm font-medium">Singapore (SG1)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                     <span className="text-sm text-muted-foreground">Created</span>
                     <span className="text-sm font-medium">20 Oct 2023</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                     <span className="text-sm text-muted-foreground">Repository</span>
                     <a href={`https://${project.repo}`} className="text-sm font-medium text-primary hover:underline truncate max-w-[150px]">
                        {project.repo}
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </main>
  )
}

export default function ProjectDetail() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { id } = useParams()

  return (
    <>
      <Helmet>
        <title>Project Details - DockPloy</title>
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
