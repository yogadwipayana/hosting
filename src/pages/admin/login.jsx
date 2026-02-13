import { useState, useContext, useEffect } from "react"
import { useNavigate, useLocation } from "react-router"
import { Helmet } from "react-helmet-async"
import { Eye, EyeOff, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LogoMark } from "@/components/Logo"
import { AdminAuthContext } from "@/context/AdminAuthContext"
import { authApi } from "@/lib/api"

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setAuth, isAuthenticated } = useContext(AdminAuthContext)
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/admin" // Default to admin dashboard
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, location])

  // Handle email/password login
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await authApi.adminLogin({ email, password })
      setAuth(response.data.token, response.data.admin)
      navigate("/admin")
    } catch (err) {
       setError(err.message || "Login gagal. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin Login - BelajarHosting</title>
        <meta name="description" content="Admin Login Interface" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <Card className="w-full max-w-md shadow-xl border-border bg-card">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
               <div className="bg-primary/10 p-3 rounded-full">
                 <Lock className="w-6 h-6 text-primary" />
               </div>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">Admin Portal</CardTitle>
            <CardDescription className="text-muted-foreground">
              Masuk untuk mengakses panel admin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Email Form */}
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input 
                  id="email" 
                  placeholder="admin@example.com" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    placeholder="••••••••" 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="pr-10 bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4 font-medium" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Masuk ke Panel"}
              </Button>
            </form>

          </CardContent>
          <CardFooter className="flex justify-center pb-6">
             <div className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} BelajarHosting Admin System
             </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
