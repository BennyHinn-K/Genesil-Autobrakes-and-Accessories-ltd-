"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"
import { usePathname } from "next/navigation"
import {
  Menu,
  X,
  ShoppingBag,
  User,
  Moon,
  Sun,
  Home,
  Info,
  Mail,
  ShoppingCart,
  LogIn,
  LogOut,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()
  const { items } = useCart()
  const pathname = usePathname()

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg"
          : "bg-white/90 dark:bg-black/90 backdrop-blur-sm"
      } border-b border-yellow-200 dark:border-yellow-400/20`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/genesil-logo.png"
                  alt="Genesil Autobrake and Accessories LTD"
                  width={60}
                  height={40}
                  className="h-12 w-auto transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback for logo loading error
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const fallback = document.createElement("div")
                    fallback.className = "h-12 w-12 bg-yellow-400 flex items-center justify-center rounded-md"
                    fallback.innerHTML = "G"
                    const parent = target.parentElement
                    if (parent) parent.appendChild(fallback)
                  }}
                />
                <div className="hidden md:flex items-center space-x-3 group">
                  <h1 className="text-xl font-bold">Genesil Autobrake</h1>
                  <p className="text-sm text-muted-foreground">and Accessories LTD</p>
                </div>
              </Link>
            </div>

            {/* Navigation Links - Make these visible */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="font-medium hover:text-yellow-500 transition-colors">
                Home
              </Link>
              <Link href="/catalogue" className="font-medium hover:text-yellow-500 transition-colors">
                Catalogue
              </Link>
              <Link href="/about" className="font-medium hover:text-yellow-500 transition-colors">
                About
              </Link>
              <Link href="/contact" className="font-medium hover:text-yellow-500 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="text-gray-700 dark:text-gray-300"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>

              {/* Cart */}
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300" aria-label="Shopping cart">
                  <ShoppingBag className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* User Menu */}
              <div className="relative">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300" aria-label="User menu">
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="cursor-pointer w-full">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/orders" className="cursor-pointer w-full">Orders</Link>
                      </DropdownMenuItem>
                      {user.isAdmin && (
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="cursor-pointer w-full">Admin Dashboard</Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/auth">
                    <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300">
                      Login
                    </Button>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-700 dark:text-gray-300"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-black border-b border-yellow-200 dark:border-yellow-400/20 z-50 animate-fade-in">
              <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="h-5 w-5 text-yellow-500" />
                  <span>Home</span>
                </Link>
                <Link 
                  href="/catalogue" 
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingBag className="h-5 w-5 text-yellow-500" />
                  <span>Catalogue</span>
                </Link>
                <Link 
                  href="/about" 
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Info className="h-5 w-5 text-yellow-500" />
                  <span>About</span>
                </Link>
                <Link 
                  href="/contact" 
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Mail className="h-5 w-5 text-yellow-500" />
                  <span>Contact</span>
                </Link>
                <Link 
                  href="/cart" 
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5 text-yellow-500" />
                  <span>Cart {cartItemsCount > 0 && `(${cartItemsCount})`}</span>
                </Link>
                {!user ? (
                  <Link 
                    href="/auth" 
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="h-5 w-5 text-yellow-500" />
                    <span>Login / Sign Up</span>
                  </Link>
                ) : (
                  <>
                    {user.isAdmin && (
                      <Link 
                        href="/admin" 
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings className="h-5 w-5 text-yellow-500" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    <button 
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600 w-full text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </>
                )}
              </nav>
            </div>
          )}
    </header>
  );
}
