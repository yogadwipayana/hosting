import { Routes, Route } from "react-router"
import { Toaster } from "sonner"
import { useClarity } from "@/hooks/useClarity"
import { ProtectedRoute } from "@/components/ProtectedRoute"
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
import VpsPage from "@/pages/products/vps"
import BlogsPage from "@/pages/blogs"
import BlogDetailPage from "@/pages/blog-detail"
import DocumentasionsPage from "@/pages/documentasions"
import GettingStartedPage from "@/pages/tutorials/gettingStarted"
import DeployPage from "@/pages/tutorials/deploy"
import BestPracticesPage from "@/pages/tutorials/bestPractices"
import RegisterPage from "@/pages/auth/register"
import LoginPage from "@/pages/auth/login"
import VerifyOtpPage from "@/pages/auth/verifyOtp"
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
import DashboardNotifications from "@/pages/dashboards/notifications"
import ProjectDashboard from "@/pages/dashboards/project"
import ProjectDetail from "@/pages/dashboards/project/projectDetail"
import NewProjectPage from "@/pages/dashboards/project/projectNew"
import ClassDashboard from "@/pages/dashboards/class"
import BookmarkDashboard from "@/pages/dashboards/bookmark"
import ManageHosting from "@/pages/dashboards/manage/manageHosting"
import ManageDatabase from "@/pages/dashboards/manage/manageDatabase"
import ManageDomain from "@/pages/dashboards/manage/manageDomain"

import ManageAutomation from "@/pages/dashboards/manage/manageAutomation"
import DashboardVps from "@/pages/dashboards/vps"
import DeployVps from "@/pages/dashboards/create/deployVps"
import ManageVps from "@/pages/dashboards/manage/manageVps"

import { AdminAuthProvider } from "@/context/AdminAuthContext"
import { AdminLayout } from "@/components/AdminLayout"
import AdminLoginPage from "@/pages/admin/login"
import AdminOverviewPage from "@/pages/admin/overview"
import AdminUsersPage from "@/pages/admin/user"
import AdminBlogsPage from "@/pages/admin/blog"
import AdminClassesPage from "@/pages/admin/class"
import AdminTransactionsPage from "@/pages/admin/transaction"
import AdminOrdersPage from "@/pages/admin/order"
import ProductCatalogPage from "@/pages/products/Catalog"

// Main App Component
export default function App() {
  useClarity()

  return (
    <AdminAuthProvider>
      <Toaster richColors position="top-right" closeButton />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* ... existing public routes ... */}
        <Route path="/produk" element={<ProductsPage />} />
        <Route path="/produk/cloud" element={<ManagedHostingPage />} />
        <Route path="/produk/database" element={<ManagedDatabasePage />} />
        <Route path="/produk/n8n" element={<N8nAutomationPage />} />
        <Route path="/produk/vps" element={<VpsPage />} />
        <Route path="/produk/catalog" element={<ProductCatalogPage />} />

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
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/docs" element={<DocumentasionsPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverviewPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="blogs" element={<AdminBlogsPage />} />
          <Route path="classes" element={<AdminClassesPage />} />
          <Route path="transactions" element={<AdminTransactionsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
        </Route>
        
        {/* Protected User Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardOverview /></ProtectedRoute>} />
        <Route path="/dashboard/proyek" element={<ProtectedRoute><ProjectDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/project/:id" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
        <Route path="/dashboard/project/new" element={<ProtectedRoute><NewProjectPage /></ProtectedRoute>} />
        <Route path="/dashboard/kelas" element={<ProtectedRoute><ClassDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/bookmark" element={<ProtectedRoute><BookmarkDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/hosting" element={<ProtectedRoute><DashboardHosting /></ProtectedRoute>} />
        <Route path="/dashboard/hosting/deploy" element={<ProtectedRoute><DeployHosting /></ProtectedRoute>} />
        <Route path="/dashboard/domain/buy" element={<ProtectedRoute><DeployDomain /></ProtectedRoute>} />
        <Route path="/dashboard/hosting/domain" element={<ProtectedRoute><ManageDomain /></ProtectedRoute>} />
        <Route path="/dashboard/hosting/manage" element={<ProtectedRoute><ManageHosting /></ProtectedRoute>} />
        <Route path="/dashboard/database" element={<ProtectedRoute><DashboardDatabase /></ProtectedRoute>} />
        <Route path="/dashboard/database/manage" element={<ProtectedRoute><ManageDatabase /></ProtectedRoute>} />
        <Route path="/dashboard/database/deploy" element={<ProtectedRoute><DeployDatabase /></ProtectedRoute>} />
        <Route path="/dashboard/automation" element={<ProtectedRoute><DashboardAutomation /></ProtectedRoute>} />
        <Route path="/dashboard/automation/manage" element={<ProtectedRoute><ManageAutomation /></ProtectedRoute>} />
        <Route path="/dashboard/automation/deploy" element={<ProtectedRoute><DeployAutomation /></ProtectedRoute>} />
        <Route path="/dashboard/pengaturan" element={<ProtectedRoute><DashboardSetting /></ProtectedRoute>} />
        <Route path="/dashboard/bantuan" element={<ProtectedRoute><DashboardSupport /></ProtectedRoute>} />
        <Route path="/dashboard/credit" element={<ProtectedRoute><DashboardCredit /></ProtectedRoute>} />
        <Route path="/dashboard/vps" element={<ProtectedRoute><DashboardVps /></ProtectedRoute>} />
        <Route path="/dashboard/vps/deploy" element={<ProtectedRoute><DeployVps /></ProtectedRoute>} />
        <Route path="/dashboard/vps/manage" element={<ProtectedRoute><ManageVps /></ProtectedRoute>} />
        <Route path="/dashboard/notifications" element={<ProtectedRoute><DashboardNotifications /></ProtectedRoute>} />
      </Routes>
    </AdminAuthProvider>
  )
}
