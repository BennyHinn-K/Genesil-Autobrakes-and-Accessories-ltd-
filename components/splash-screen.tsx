"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Mark as loaded immediately to avoid issues with image loading
    setIsLoaded(true)

    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center splash-screen">
      <div className="text-center animate-fade-in">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Image
              src="/genesil-logo.png"
              alt="Genesil Autobrake and Accessories LTD"
              width={350}
              height={250}
              className={`transition-all duration-1000 ${isLoaded ? "animate-pulse-glow" : "opacity-50"}`}
              priority
              onError={() => {
                console.log("Failed to load splash screen logo, using fallback")
                // Continue showing the splash screen even if the image fails to load
                setIsLoaded(true)
              }}
            />
            <div className="absolute inset-0 animate-shimmer"></div>
          </div>
        </div>
        <div className="flex justify-center space-x-3">
          <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
        <p className="mt-6 text-white text-lg font-semibold animate-fade-in">Loading Premium Auto Parts...</p>
      </div>
    </div>
  )
}
