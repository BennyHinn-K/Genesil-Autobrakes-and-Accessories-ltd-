import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "./context/ThemeContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Genesil Autospares & Accessories Ltd - Premium Auto Parts",
  description:
    "Leading supplier of high-quality automotive spare parts and accessories in Kenya. Professional parts with M-Pesa payment integration.",
  keywords: "autospares, car parts, automotive accessories, brake systems, spare parts, Kenya, M-Pesa",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
