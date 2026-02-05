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
import DomainCheckPage from "@/pages/tools/domainCheck"
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
import DashboardHosting from "@/pages/dashboards/hosting"
import DeployHosting from "@/pages/dashboards/create/deployHosting"
import DeployDomain from "@/pages/dashboards/create/deployDomain"
import DeployDatabase from "@/pages/dashboards/create/deployDatabase"
import DeployAutomation from "@/pages/dashboards/create/deployAutomation"
import DashboardDatabase from "@/pages/dashboards/database"
import DashboardAutomation from "@/pages/dashboards/automation"
import DashboardSetting from "@/pages/dashboards/setting"
import DashboardSupport from "@/pages/dashboards/support"
import DashboardCredit from "@/pages/dashboards/credit"
import ProjectDashboard from "@/pages/dashboards/project"
import ProjectDetail from "@/pages/dashboards/project/projectDetail"
import NewProjectPage from "@/pages/dashboards/project/projectNew"
import ClassDashboard from "@/pages/dashboards/class"
import BookmarkDashboard from "@/pages/dashboards/bookmark"

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
      <Route path="/alat/domain-checker" element={<DomainCheckPage />} />

      <Route path="/edukasi" element={<EducationsPage />} />
      <Route path="/edukasi/getting-started" element={<GettingStartedPage />} />
      <Route path="/edukasi/deploy" element={<DeployPage />} />
      <Route path="/edukasi/best-practices" element={<BestPracticesPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/blog" element={<BlogsPage />} />
      <Route path="/docs" element={<DocumentasionsPage />} />
      <Route path="/dashboard" element={<DashboardOverview />} />
      <Route path="/dashboard/proyek" element={<ProjectDashboard />} />
      <Route path="/dashboard/project/:id" element={<ProjectDetail />} />
      <Route path="/dashboard/project/new" element={<NewProjectPage />} />
      <Route path="/dashboard/kelas" element={<ClassDashboard />} />
      <Route path="/dashboard/bookmark" element={<BookmarkDashboard />} />
      <Route path="/dashboard/hosting" element={<DashboardHosting />} />
      <Route path="/dashboard/hosting/deploy" element={<DeployHosting />} />
      <Route path="/dashboard/hosting/domain" element={<DeployDomain />} />
      <Route path="/dashboard/database" element={<DashboardDatabase />} />
      <Route path="/dashboard/database/deploy" element={<DeployDatabase />} />
      <Route path="/dashboard/automation" element={<DashboardAutomation />} />
      <Route path="/dashboard/automation/deploy" element={<DeployAutomation />} />
      <Route path="/dashboard/pengaturan" element={<DashboardSetting />} />
      <Route path="/dashboard/bantuan" element={<DashboardSupport />} />
      <Route path="/dashboard/credit" element={<DashboardCredit />} />
      
    </Routes>
  )
}


