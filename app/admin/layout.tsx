import type React from "react"
import { MainNav } from "@/components/navigation/main-nav"

// Mock user data - will be replaced with actual authentication
const mockUser = {
  name: "Administrador",
  email: "admin@tea.edu",
  role: "admin" as const,
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <MainNav userRole={mockUser.role} userName={mockUser.name} userEmail={mockUser.email} />
      <main>{children}</main>
    </div>
  )
}
