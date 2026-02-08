import { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation, Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogoMark } from "@/components/Logo"
import { useAuth } from "@/hooks/useAuth"
import { authApi } from "@/lib/api"

const OTP_LENGTH = 6
const RESEND_COUNTDOWN = 60

export default function VerifyOtpPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setAuth } = useAuth()
  
  const email = location.state?.email
  
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""))
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [countdown, setCountdown] = useState(RESEND_COUNTDOWN)
  const [canResend, setCanResend] = useState(false)
  
  const inputRefs = useRef([])

  // Redirect if no email in state
  useEffect(() => {
    if (!email) {
      navigate("/register", { replace: true })
    }
  }, [email, navigate])

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  // Handle input change
  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return
    
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // Only keep last character
    setOtp(newOtp)
    
    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, OTP_LENGTH)
    
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp]
      pastedData.split("").forEach((char, index) => {
        if (index < OTP_LENGTH) {
          newOtp[index] = char
        }
      })
      setOtp(newOtp)
      
      // Focus last filled input or next empty
      const focusIndex = Math.min(pastedData.length, OTP_LENGTH - 1)
      inputRefs.current[focusIndex]?.focus()
    }
  }

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle verification
  const handleVerify = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    
    const code = otp.join("")
    if (code.length !== OTP_LENGTH) {
      setError("Masukkan kode OTP lengkap (6 digit)")
      return
    }

    setIsLoading(true)

    try {
      const response = await authApi.verifyOtp({ email, code })
      setAuth(response.data.token, response.data.user)
      navigate("/dashboard", { replace: true })
    } catch (err) {
      setError(err.message || "Kode OTP tidak valid atau sudah kadaluarsa")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle resend OTP
  const handleResend = async () => {
    if (!canResend) return
    
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      await authApi.resendOtp({ email })
      setSuccess("Kode OTP baru telah dikirim ke email Anda")
      setCountdown(RESEND_COUNTDOWN)
      setCanResend(false)
      setOtp(Array(OTP_LENGTH).fill(""))
      inputRefs.current[0]?.focus()
    } catch (err) {
      setError(err.message || "Gagal mengirim ulang kode OTP")
    } finally {
      setIsLoading(false)
    }
  }

  // Format countdown time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!email) return null

  return (
    <>
      <Helmet>
        <title>Verifikasi Email - BelajarHosting</title>
        <meta name="description" content="Verifikasi alamat email Anda untuk melanjutkan." />
      </Helmet>

      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <Card className="w-full max-w-md shadow-lg border-gray-200">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
               <LogoMark size={48} />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Verifikasi Email</CardTitle>
            <CardDescription>
              Masukkan kode 6 digit yang dikirim ke<br />
              <span className="font-medium text-gray-900">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                {success}
              </div>
            )}

            {/* OTP Input */}
            <form onSubmit={handleVerify}>
              <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-14 text-center text-xl font-semibold"
                    disabled={isLoading}
                  />
                ))}
              </div>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700" 
                type="submit"
                disabled={isLoading || otp.join("").length !== OTP_LENGTH}
              >
                {isLoading ? "Memverifikasi..." : "Verifikasi"}
              </Button>
            </form>

            {/* Resend Section */}
            <div className="text-center text-sm text-muted-foreground">
              <p>Tidak menerima kode?</p>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isLoading}
                  className="text-blue-600 hover:underline font-medium mt-1"
                >
                  Kirim ulang kode
                </button>
              ) : (
                <p className="mt-1">
                  Kirim ulang dalam <span className="font-medium">{formatTime(countdown)}</span>
                </p>
              )}
            </div>

            {/* Back to register */}
            <div className="text-center text-sm">
              <Link to="/register" className="text-muted-foreground hover:text-blue-600">
                ← Kembali ke halaman daftar
              </Link>
            </div>

          </CardContent>
        </Card>
      </div>
    </>
  )
}
