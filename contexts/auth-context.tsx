"use client"
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  plan: "free" | "basic" | "pro" | "premium"
  isVerified: boolean
  balance: {
    real: number
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  isAuthenticated: boolean
  updateUser: (updatedUserData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock authentication - replace with real API calls
  const login = useCallback(async (email: string, password: string, rememberMe = false) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation
    if (email === "demo@creatorhub.com" && password === "demo123") {
      const mockUser: User = {
        id: "1",
        email: email,
        name: "Demo User",
        avatar: "https://i.pravatar.cc/150?img=1",
        plan: "pro",
        isVerified: true,
        balance: {
          real: 123.45,
        },
      }

      setUser(mockUser)

      // Store in localStorage if remember me is checked
      if (rememberMe) {
        localStorage.setItem("creatorhub_user", JSON.stringify(mockUser))
        localStorage.setItem("creatorhub_remember", "true")
      } else {
        sessionStorage.setItem("creatorhub_user", JSON.stringify(mockUser))
      }

      setIsLoading(false)
      return { success: true }
    }

    setIsLoading(false)
    return { success: false, error: "Credenciais inválidas. Tente novamente." }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("creatorhub_user")
    localStorage.removeItem("creatorhub_remember")
    sessionStorage.removeItem("creatorhub_user")
    // Redirect using window.location for logout to avoid router issues during build
    if (typeof window !== "undefined") {
      window.location.href = "/" // Or your desired logout destination
    }
  }, [])

  const register = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock registration
    const mockUser: User = {
      id: Date.now().toString(),
      email: email,
      name: name,
      plan: "free",
      isVerified: false,
      balance: {
        real: 0,
      },
    }

    setUser(mockUser)
    sessionStorage.setItem("creatorhub_user", JSON.stringify(mockUser))

    setIsLoading(false)
    return { success: true }
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock password reset
    return { success: true }
  }, [])

  const updateUser = useCallback((updatedUserData: Partial<User>) => {
    setUser((currentUser) => {
      if (!currentUser) return null
      const newUser = {
        ...currentUser,
        ...updatedUserData,
        balance: { ...currentUser.balance, ...updatedUserData.balance },
      }

      if (localStorage.getItem("creatorhub_user")) {
        localStorage.setItem("creatorhub_user", JSON.stringify(newUser))
      }
      if (sessionStorage.getItem("creatorhub_user")) {
        sessionStorage.setItem("creatorhub_user", JSON.stringify(newUser))
      }

      return newUser
    })
  }, [])

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("creatorhub_user") || sessionStorage.getItem("creatorhub_user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing stored user:", error)
      }
    }
    setIsLoading(false)
  }, [])

  const value = {
    user,
    isLoading,
    login,
    logout,
    register,
    resetPassword,
    isAuthenticated: !!user,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
