import { Routes, Route } from "react-router"
import { useClarity } from "@/hooks/useClarity"
import LandingPage from "@/pages/landingPages"
import ToolsPage from "@/pages/tools"
import ProductsPage from "@/pages/products"
import EducationsPage from "@/pages/educations"
import UptimeCheckerPage from "@/pages/tools/uptimeChecker"
import PasswordGeneratorPage from "@/pages/tools/passwordGenerator"
import QRCodePage from "@/pages/tools/qrCode"
import ColorConverterPage from "@/pages/tools/colorConverter"
import UnixTimestampPage from "@/pages/tools/unixTimestamp"
import ManagedHostingPage from "@/pages/products/cloud"
import ManagedDatabasePage from "@/pages/products/database"
import N8nAutomationPage from "@/pages/products/n8n"
import BlogsPage from "@/pages/blogs"
import DocumentasionsPage from "@/pages/documentasions"
import GettingStartedPage from "@/pages/tutorials/gettingStarted"
import DeployPage from "@/pages/tutorials/deploy"
import BestPracticesPage from "@/pages/tutorials/bestPractices"
import RegisterPage from "@/pages/auth/register"
import LoginPage from "@/pages/auth/login"
import DashboardOverview from "@/pages/dashboards/overview"

// Main App Component
export default function App() {
  useClarity()

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/produk" element={<ProductsPage />} />
      <Route path="/produk/cloud" element={<ManagedHostingPage />} />
      <Route path="/produk/database" element={<ManagedDatabasePage />} />
      <Route path="/produk/n8n" element={<N8nAutomationPage />} />

      <Route path="/alat" element={<ToolsPage />} />
      <Route path="/alat/uptime-checker" element={<UptimeCheckerPage />} />
      <Route path="/alat/password-generator" element={<PasswordGeneratorPage />} />
      <Route path="/alat/qr-code" element={<QRCodePage />} />
      <Route path="/alat/color-converter" element={<ColorConverterPage />} />
      <Route path="/alat/unix-timestamp" element={<UnixTimestampPage />} />

      <Route path="/edukasi" element={<EducationsPage />} />
      <Route path="/edukasi/getting-started" element={<GettingStartedPage />} />
      <Route path="/edukasi/deploy" element={<DeployPage />} />
      <Route path="/edukasi/best-practices" element={<BestPracticesPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/blog" element={<BlogsPage />} />
      <Route path="/docs" element={<DocumentasionsPage />} />
      <Route path="/dashboard" element={<DashboardOverview />} />
      
    </Routes>
  )
}


