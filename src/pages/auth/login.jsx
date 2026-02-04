import { Link } from "react-router"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LogoMark } from "@/components/Logo"
import { HugeiconsIcon } from "@hugeicons/react"
import { GoogleIcon } from "@hugeicons/core-free-icons"

// Custom Google Icon Component (Consistent with Register Page)
const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
    <path
      d="M12.0003 20.45c4.6667 0 7.9584-3.25 7.9584-8.0833 0-.625-.0626-1.0417-.1875-1.5834H12.0003v3.1876h4.5209c-.1041.875-.625 2.1458-1.6875 2.9166v2.2292h2.7292c1.6041-1.4791 2.5208-3.6666 2.5208-6.1874 0-.5834-.0625-1.1459-.1667-1.6876H12.0003V10.9h6.1459c.1458.7084.2291 1.4375.2291 2.1875 0 3.3958-2.2916 6.0625-5.5416 6.0625-2.6042 0-4.8333-1.4791-5.8333-3.6041l-2.6042 2.0208C5.6462 19.4375 8.6045 21.4167 12.0003 21.4167z"
      fill="#4285F4"
    />
    <path
      d="M6.1669 15.5416c-.25-.75-.3958-1.5416-.3958-2.3541 0-.8125.1458-1.6042.3958-2.3542l-2.6041-2.0208C3.0419 10.0208 2.6669 11.4792 2.6669 13.1875s.375 3.1667.8958 4.375l2.6042-2.0209z"
      fill="#FBBC05"
    />
    <path
      d="M12.0003 6.2917c1.375 0 2.625.4791 3.5833 1.3958l2.3959-2.3958C16.5211 3.9375 14.4169 3.0833 12.0003 3.0833c-3.3959 0-6.3542 1.9792-7.8334 4.8542l2.6041 2.0208c1.0001-2.125 3.2292-3.6666 5.8334-3.6666z"
      fill="#EA4335"
    />
    <path
      d="M12.0003 21.4167c-3.3958 0-6.3542-1.9792-7.8333-4.8542l-2.6042 2.0208c1.4792 2.8959 4.4375 4.875 7.8334 4.875 3.125 0 5.8958-1.7292 7.4375-4.3125l-2.7292-2.2291c-1.2291.9583-2.9166 1.5-4.7083 1.5z"
      fill="#34A853"
    />
  </svg>
)


export default function LoginPage() {
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
            
            {/* Google Sign In */}
            <Button variant="outline" className="w-full h-11 bg-white hover:bg-gray-50 border-gray-300 text-gray-700 font-medium">
              <GoogleLogo />
              Masuk dengan Google
            </Button>

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
            <form className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="nama@contoh.com" type="email" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline">
                    Lupa Password?
                  </Link>
                </div>
                <Input id="password" placeholder="••••••••" type="password" />
              </div>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2" type="submit">
                Masuk
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
