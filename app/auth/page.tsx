"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle } from "lucide-react"

export default function AuthPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({ email: "", password: "", confirmPassword: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<{
    login: string | null
    signup: string | null
  }>({ login: null, signup: null })
  const { login, signup, user, error } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user, router])

  const validateLoginForm = (): boolean => {
    if (!loginData.email || !loginData.password) {
      setValidationErrors((prev) => ({ ...prev, login: "Email and password are required" }))
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(loginData.email)) {
      setValidationErrors((prev) => ({ ...prev, login: "Please enter a valid email address" }))
      return false
    }

    setValidationErrors((prev) => ({ ...prev, login: null }))
    return true
  }

  const validateSignupForm = (): boolean => {
    if (!signupData.email || !signupData.password || !signupData.confirmPassword) {
      setValidationErrors((prev) => ({ ...prev, signup: "All fields are required" }))
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(signupData.email)) {
      setValidationErrors((prev) => ({ ...prev, signup: "Please enter a valid email address" }))
      return false
    }

    if (signupData.password.length < 6) {
      setValidationErrors((prev) => ({ ...prev, signup: "Password must be at least 6 characters long" }))
      return false
    }

    if (signupData.password !== signupData.confirmPassword) {
      setValidationErrors((prev) => ({ ...prev, signup: "Passwords do not match" }))
      return false
    }

    setValidationErrors((prev) => ({ ...prev, signup: null }))
    return true
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateLoginForm()) {
      return
    }

    setIsLoading(true)

    try {
      const success = await login(loginData.email, loginData.password)
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        })
        router.push("/")
      } else if (error) {
        setValidationErrors((prev) => ({ ...prev, login: error }))
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateSignupForm()) {
      return
    }

    setIsLoading(true)

    try {
      const success = await signup(signupData.email, signupData.password)
      if (success) {
        toast({
          title: "Account created",
          description: "Welcome to Genesil!",
        })
        router.push("/")
      } else if (error) {
        setValidationErrors((prev) => ({ ...prev, signup: error }))
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Welcome
            </h1>
            <p className="text-muted-foreground text-lg">Sign in to your account or create a new one</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <TabsTrigger value="login" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Login</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-6">
                    {validationErrors.login && (
                      <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4 flex items-start">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-red-600 dark:text-red-400 text-sm">{validationErrors.login}</p>
                      </div>
                    )}
                    <div>
                      <label htmlFor="login-email" className="block text-sm font-semibold mb-2">
                        Email
                      </label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                        className="h-12 rounded-xl border-yellow-200 focus:border-yellow-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="login-password" className="block text-sm font-semibold mb-2">
                        Password
                      </label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                        className="h-12 rounded-xl border-yellow-200 focus:border-yellow-400"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-12 premium-button text-black font-semibold text-lg rounded-xl"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                      <p>Admin login: any email with password "K@ranJA"</p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-6">
                    {validationErrors.signup && (
                      <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4 flex items-start">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-red-600 dark:text-red-400 text-sm">{validationErrors.signup}</p>
                      </div>
                    )}
                    <div>
                      <label htmlFor="signup-email" className="block text-sm font-semibold mb-2">
                        Email
                      </label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                        className="h-12 rounded-xl border-yellow-200 focus:border-yellow-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="signup-password" className="block text-sm font-semibold mb-2">
                        Password
                      </label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                        className="h-12 rounded-xl border-yellow-200 focus:border-yellow-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-semibold mb-2">
                        Confirm Password
                      </label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        required
                        className="h-12 rounded-xl border-yellow-200 focus:border-yellow-400"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-12 premium-button text-black font-semibold text-lg rounded-xl"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
