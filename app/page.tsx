"use client"

import { useEffect, useState } from "react"
import { SplashScreen } from "@/components/splash-screen"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Footer } from "@/components/footer"
import { DraggableChatBot } from "@/components/draggable-chatbot"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedProducts />
      <WhyChooseUs />
      <Footer />
      <DraggableChatBot />
    </div>
  )
}
