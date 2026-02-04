import { Routes, Route } from "react-router"
import { useClarity } from "@/hooks/useClarity"
import LandingPage from "@/pages/landingPages"
import ToolsPage from "@/pages/tools"
import ProductsPage from "@/pages/products"
import EducationsPage from "@/pages/educations"
import UptimeCheckerPage from "@/pages/tools/uptimeChecker"

// Main App Component
export default function App() {
  useClarity()

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/produk" element={<ProductsPage />} />

      <Route path="/alat" element={<ToolsPage />} />
      <Route path="/alat/uptime-checker" element={<UptimeCheckerPage />} />

      <Route path="/edukasi" element={<EducationsPage />} />
      
    </Routes>
  )
}
