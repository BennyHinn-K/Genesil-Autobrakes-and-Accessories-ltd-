import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"
import { CartProvider } from "@/components/cart-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Genesil Autobrake and Accessories LTD - Premium Auto Parts Kenya",
  description:
    "Your trusted spare parts supplier in Nairobi. Genuine parts for Toyota, Nissan, Subaru, Mitsubishi and European brands. Real parts. Real performance.",
  keywords: "auto parts, spare parts, Nairobi, Kenya, Toyota, Nissan, Subaru, Mitsubishi, brake parts, accessories",
  metadataBase: new URL("https://genesilautobrakeandaccessories.com"),
  openGraph: {
    title: "Genesil Autobrake and Accessories LTD",
    description: "Premium auto parts supplier in Nairobi, Kenya",
    url: "https://genesilautobrakeandaccessories.com",
    siteName: "Genesil Autobrake and Accessories LTD",
    images: [
      {
        url: "/genesil-logo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Genesil Autobrake and Accessories LTD",
    description: "Premium auto parts supplier in Nairobi, Kenya",
    images: ["/genesil-logo.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://genesilautobrakeandaccessories.com" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
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
