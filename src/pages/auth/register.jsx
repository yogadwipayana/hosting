import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router"
import { Helmet } from "react-helmet-async"
import { GoogleLogin } from "@react-oauth/google"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LogoMark } from "@/components/Logo"
import { useAuth } from "@/hooks/useAuth"
import { authApi } from "@/lib/api"


export default function RegisterPage() {
  const navigate = useNavigate()
  const { setAuth, isAuthenticated } = useAuth()
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true })
    }
  }, [isAuthenticated, navigate])

  // Handle form validation
  const validateForm = () => {
    if (password.length < 8) {
      setError("Password harus minimal 8 karakter")
      return false
    }
    if (password !== confirmPassword) {
      setError("Password tidak cocok")
      return false
    }
    return true
  }

  // Handle email/password registration
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    
    if (!validateForm()) return

    setIsLoading(true)

    try {
      await authApi.register({ email, password, name })
      // Redirect to OTP verification
      navigate("/verify-otp", { state: { email } })
    } catch (err) {
      if (err.status === 409) {
        setError("Email sudah terdaftar. Silakan login.")
      } else {
        setError(err.message || "Registrasi gagal. Silakan coba lagi.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Google OAuth success
  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true)
    setError("")
    
    try {
      const response = await authApi.googleAuth(credentialResponse.credential)
      setAuth(response.data.token, response.data.user)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message || "Registrasi dengan Google gagal.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Google OAuth error
  const handleGoogleError = () => {
    setError("Registrasi dengan Google gagal.")
  }

  return (
    <>
      <Helmet>
        <title>Register - BelajarHosting</title>
        <meta name="description" content="Buat akun baru di BelajarHosting untuk mulai belajar dan deploy aplikasi Anda." />
      </Helmet>

      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <Card className="w-full max-w-md shadow-lg border-gray-200">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
               <LogoMark size={48} />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Buat Akun Baru</CardTitle>
            <CardDescription>
              Mulai perjalanan deployment Anda hari ini. Gratis!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Google Sign Up */}
            <div className="w-full">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="signup_with"
                shape="rectangular"
                width={350}
                locale="id"
                useOneTap={false}
                auto_select={false}
                context="signup"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 text-muted-foreground bg-gray-50">
                  Atau daftar dengan email
                </span>
              </div>
            </div>

            {/* Email Form */}
            <form className="space-y-3" onSubmit={handleSubmit}>
               <div className="space-y-1">
                <Label htmlFor="fullname">Nama Lengkap</Label>
                <Input 
                  id="fullname" 
                  placeholder="John Doe" 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
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
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  placeholder="••••••••" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={8}
                />
                <p className="text-xs text-muted-foreground">Minimal 8 karakter</p>
              </div>
               <div className="space-y-1">
                <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                <Input 
                  id="confirm-password" 
                  placeholder="••••••••" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 mt-2" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Buat Akun"}
              </Button>
            </form>

          </CardContent>
          <CardFooter className="flex flex-col gap-4 text-center text-sm text-muted-foreground">
            <p>
              Sudah punya akun?{" "}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Masuk di sini
              </Link>
            </p>
            <p className="text-xs px-6">
              Dengan mendaftar, Anda menyetujui{" "}
              <Link to="/terms" className="underline hover:text-blue-600">Syarat & Ketentuan</Link>
              {" "}dan{" "}
              <Link to="/privacy" className="underline hover:text-blue-600">Kebijakan Privasi</Link>
              {" "}kami.
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
