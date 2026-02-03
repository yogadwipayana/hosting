import { Routes, Route } from "react-router"
import { useClarity } from "@/hooks/useClarity"
import LandingPage from "@/pages/landingPages"

// Main App Component
export default function App() {
  useClarity()

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  )
}
