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
  title: "Genesil Autospares & Accessories Ltd - Premium Auto Parts Kenya",
  description:
    "Leading supplier of genuine automotive spare parts and accessories in Kenya. Professional brake systems, parts with M-Pesa payment. Located in Kirinyaga Road, Nairobi.",
  keywords:
    "autospares, car parts, automotive accessories, brake systems, spare parts, Kenya, M-Pesa, Nairobi, genuine parts",
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
