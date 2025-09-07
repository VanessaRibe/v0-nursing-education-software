export interface User {
  id: number
  nome: string
  email: string
  tipo: "admin" | "estudante"
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem("usuario")
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

export function isAuthenticated(): boolean {
  return !!getStoredToken()
}

export function requireAuth(): User {
  const user = getStoredUser()
  if (!user) {
    window.location.href = "/"
    throw new Error("Authentication required")
  }
  return user
}

export function requireAdminAuth(): User {
  const user = requireAuth()
  if (user.tipo !== "admin") {
    window.location.href = "/student/dashboard"
    throw new Error("Admin access required")
  }
  return user
}
