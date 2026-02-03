import { Routes, Route } from "react-router"
import { useClarity } from "@/hooks/useClarity"
import LandingPage from "@/pages/landingPages"
import ToolsPage from "@/pages/tools"

// Main App Component
export default function App() {
  useClarity()

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/alat" element={<ToolsPage />} />
    </Routes>
  )
}
