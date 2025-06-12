"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Menu, X, User, Settings, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useCart()
  const { user, isAdmin, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="bg-black shadow-lg sticky top-0 z-40 border-b-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/genesil-logo.png"
              alt="Genesil Logo"
              width={60}
              height={40}
              className="object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">Genesil</h1>
              <p className="text-xs text-gray-300">Autospares & Accessories</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-yellow-400 transition-colors font-medium">
              Home
            </Link>
            <Link href="/catalogue" className="text-white hover:text-yellow-400 transition-colors font-medium">
              Catalogue
            </Link>
            <Link href="/about" className="text-white hover:text-yellow-400 transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-yellow-400 transition-colors font-medium">
              Contact
            </Link>
            {isAdmin && (
              <Link href="/admin" className="text-white hover:text-yellow-400 transition-colors font-medium">
                <Settings className="h-5 w-5 inline mr-1" />
                Admin
              </Link>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">Welcome, {user.name}</span>
                <Button variant="ghost" size="sm" onClick={logout} className="text-white hover:text-yellow-400">
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400">
                  <User className="h-5 w-5 mr-1" />
                  Login
                </Button>
              </Link>
            )}

            <Button variant="ghost" size="sm" onClick={toggleTheme} className="text-white hover:text-yellow-400">
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            <Link href="/cart" className="relative">
              <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black border-t border-yellow-400">
              <Link href="/" className="block px-3 py-2 text-white hover:text-yellow-400 font-medium">
                Home
              </Link>
              <Link href="/catalogue" className="block px-3 py-2 text-white hover:text-yellow-400 font-medium">
                Catalogue
              </Link>
              <Link href="/about" className="block px-3 py-2 text-white hover:text-yellow-400 font-medium">
                About
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-white hover:text-yellow-400 font-medium">
                Contact
              </Link>
              {isAdmin && (
                <Link href="/admin" className="block px-3 py-2 text-white hover:text-yellow-400 font-medium">
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
