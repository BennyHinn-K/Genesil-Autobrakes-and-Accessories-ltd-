"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  email: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  signup: (email: string, password: string) => Promise<boolean>
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check for existing session
    try {
      const savedUser = localStorage.getItem("genesil_user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error)
      localStorage.removeItem("genesil_user")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setError(null)
      setIsLoading(true)

      // Validate inputs
      if (!email || !password) {
        setError("Email and password are required")
        return false
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address")
        return false
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check for admin credentials
      const isAdmin = password === "K@ranJA"
      const userData = { email, isAdmin }

      setUser(userData)
      localStorage.setItem("genesil_user", JSON.stringify(userData))
      return true
    } catch (error) {
      console.error("Login error:", error)
      setError("An error occurred during login. Please try again.")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("genesil_user")
  }

  const signup = async (email: string, password: string): Promise<boolean> => {
    try {
      setError(null)
      setIsLoading(true)

      // Validate inputs
      if (!email || !password) {
        setError("Email and password are required")
        return false
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address")
        return false
      }

      // Password validation
      if (password.length < 6) {
        setError("Password must be at least 6 characters long")
        return false
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const userData = { email, isAdmin: false }
      setUser(userData)
      localStorage.setItem("genesil_user", JSON.stringify(userData))
      return true
    } catch (error) {
      console.error("Signup error:", error)
      setError("An error occurred during signup. Please try again.")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isLoading, error }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
