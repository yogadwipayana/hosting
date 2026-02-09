import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router"
import { Helmet } from "react-helmet-async"
import { Eye, EyeOff } from "lucide-react"
import { GoogleLogin } from "@react-oauth/google"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LogoMark } from "@/components/Logo"
import { useAuth } from "@/hooks/useAuth"
import { authApi } from "@/lib/api"


export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setAuth, isAuthenticated } = useAuth()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/dashboard"
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, location])

  // Handle email/password login
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await authApi.login({ email, password })
      setAuth(response.data.token, response.data.user)
      navigate("/dashboard")
    } catch (err) {
      if (err.status === 403) {
        // User not verified, redirect to OTP page
        navigate("/verify-otp", { state: { email } })
      } else {
        setError(err.message || "Login gagal. Silakan coba lagi.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Google OAuth Success
  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true)
    setError("")
    
    try {
      const response = await authApi.googleAuth(credentialResponse.credential)
      setAuth(response.data.token, response.data.user)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message || "Login dengan Google gagal.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Google OAuth Error
  const handleGoogleError = () => {
    setError("Login dengan Google gagal.")
  }


  return (
    <>
      <Helmet>
        <title>Login - BelajarHosting</title>
        <meta name="description" content="Masuk ke akun BelajarHosting Anda untuk melanjutkan pembelajaran." />
      </Helmet>

      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <Card className="w-full max-w-md shadow-lg border-gray-200">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
               <LogoMark size={48} />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Selamat Datang Kembali</CardTitle>
            <CardDescription>
              Masuk untuk mengakses dashboard dan tutorial Anda.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Google Sign In */}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                width="100%"
                text="signin_with"
                shape="rectangular"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 text-muted-foreground bg-gray-50">
                  Atau masuk dengan email
                </span>
              </div>
            </div>

            {/* Email Form */}
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  placeholder="nama@contoh.com" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline">
                    Lupa Password?
                  </Link>
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
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 mt-2" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
            </form>

          </CardContent>
          <CardFooter className="flex flex-col gap-4 text-center text-sm text-muted-foreground">
            <p>
              Belum punya akun?{" "}
              <Link to="/register" className="text-blue-600 hover:underline font-medium">
                Daftar sekarang
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
