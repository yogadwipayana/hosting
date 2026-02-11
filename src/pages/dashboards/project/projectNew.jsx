

import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardTopbar } from "@/components/DashboardTopbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { projectApi } from "@/lib/api"
import { 
  Rocket, 
  GitBranch, 
  Github, 
  Globe, 
  Server,
  Code2,
  Database,
  ArrowRight,
  ChevronRight,
  AlertCircle
} from "lucide-react"

// Component for the main content
const MainContent = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedFramework, setSelectedFramework] = useState("react")
    const [customFramework, setCustomFramework] = useState("")
    const [formData, setFormData] = useState({
        repoUrl: '',
        branch: 'main',
        projectName: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const framework = selectedFramework === 'other' ? customFramework : selectedFramework
            
            await projectApi.createProject({
                name: formData.projectName,
                repo: formData.repoUrl,
                branch: formData.branch,
                framework: framework,
            })

            navigate("/dashboard/proyek")
        } catch (err) {
            setError(err.message || 'Failed to create project')
            console.error('Failed to create project:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="min-h-[calc(100vh-64px)] bg-gray-50/50 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <span className="cursor-pointer hover:text-primary" onClick={() => navigate("/dashboard/proyek")}>Proyek</span>
                        <ChevronRight size={14} />
                        <span className="text-foreground font-medium">Proyek Baru</span>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">Buat Proyek Baru</h1>
                    <p className="text-muted-foreground mt-1">Deploy aplikasi baru anda dalam hitungan menit.</p>
                </div>

                {/* Form Card */}
                <div className="bg-card rounded-xl border shadow-sm p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        
                        {/* Section 1: Project Source */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <Github size={18} />
                                </div>
                                Import Repository Git
                            </h3>
                        <div className="grid gap-4 p-4 border rounded-lg bg-muted/20">
                                <div className="space-y-2">
                                    <Label htmlFor="repo-url">URL Repository</Label>
                                    <div className="relative">
                                        <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                        <Input 
                                            id="repo-url" 
                                            placeholder="https://github.com/username/repo" 
                                            className="pl-9"
                                            value={formData.repoUrl}
                                            onChange={(e) => setFormData({...formData, repoUrl: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Mendukung repository publik dari GitHub, GitLab, dan Bitbucket.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="branch">Branch</Label>
                                    <div className="relative">
                                        <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                        <Input 
                                            id="branch" 
                                            placeholder="main" 
                                            className="pl-9"
                                            value={formData.branch}
                                            onChange={(e) => setFormData({...formData, branch: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Project Configuration */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <Rocket size={18} />
                                </div>
                                Detail Proyek
                            </h3>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="project-name">Nama Proyek</Label>
                                    <div className="relative">
                                        <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                        <Input 
                                            id="project-name" 
                                            placeholder="proyek-saya" 
                                            className="pl-9"
                                            value={formData.projectName}
                                            onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="framework">Preset Framework</Label>
                                    <select 
                                        id="framework"
                                        value={selectedFramework}
                                        onChange={(e) => setSelectedFramework(e.target.value)}
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="react">React / Vite</option>
                                        <option value="next">Next.js</option>
                                        <option value="vue">Vue.js</option>
                                        <option value="node">Node.js</option>
                                        <option value="python">Python</option>
                                        <option value="docker">Docker</option>
                                        <option value="other">Lainnya</option>
                                    </select>
                                    {selectedFramework === 'other' && (
                                        <Input 
                                            placeholder="Masukkan nama framework" 
                                            value={customFramework}
                                            onChange={(e) => setCustomFramework(e.target.value)}
                                            className="mt-2"
                                            required
                                        />
                                    )}
                                </div>
                            </div>
                        </div>


                        {error && (
                            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                                <AlertCircle size={18} />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        <div className="pt-6 border-t flex items-center justify-end gap-4">
                            <Button type="button" variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900" onClick={() => navigate("/dashboard/proyek")}>
                                Batal
                            </Button>
                            <Button type="submit" size="lg" className="min-w-[150px]" disabled={isLoading}>
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                                        Mendeploy...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Deploy Proyek
                                        <ArrowRight size={16} />
                                    </span>
                                )}
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </main>
    )
}

export default function NewProjectPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>Buat Proyek Baru - DockPloy</title>
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
