import { useState, useEffect } from "react"
import { useParams, Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import { projectApi } from "@/lib/api"
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
  ExternalLink,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"



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
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        const response = await projectApi.getProjectById(id)
        setProject(response.data.project)
      } catch (err) {
        setError(err.message)
        console.error('Failed to fetch project:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProject()
    }
  }, [id])

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-gray-50/50 p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </main>
    )
  }

  if (error || !project) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-gray-50/50 p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <p className="text-lg font-semibold">Project not found</p>
          <p className="text-muted-foreground">{error || 'The project you are looking for does not exist.'}</p>
          <Link to="/dashboard/proyek">
            <Button variant="outline">
              <ArrowLeft size={16} className="mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  }

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
               {project.domain && (
                 <a href={`https://${project.domain}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                   <Globe size={14} />
                   {project.domain}
                 </a>
               )}
               <span className="flex items-center gap-1.5">
                 <GitBranch size={14} />
                 {project.branch}
               </span>
               <span className="flex items-center gap-1.5">
                 <Clock size={14} />
                 {formatDate(project.updatedAt)}
               </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw size={14} className="mr-2" /> Redeploy
            </Button>
            {project.domain && (
              <Button variant="default" size="sm" asChild>
                <a href={`https://${project.domain}`} target="_blank" rel="noreferrer">
                  <ExternalLink size={14} className="mr-2" /> Visit
                </a>
              </Button>
            )}
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
                    <p className="font-medium text-foreground">{project.commitMessage || 'No commit message'}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      {project.commitHash && (
                        <>
                          <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">{project.commitHash}</span>
                          <span>•</span>
                        </>
                      )}
                      <span>{formatDate(project.updatedAt)}</span>
                    </div>
                 </div>
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
                     <span className="text-sm text-muted-foreground">Created</span>
                     <span className="text-sm font-medium">{formatDate(project.createdAt)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                     <span className="text-sm text-muted-foreground">Repository</span>
                     <a href={`https://${project.repo}`} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary hover:underline truncate max-w-[150px]">
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
