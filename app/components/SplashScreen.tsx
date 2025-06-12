"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-black/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-black/5 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div
        className={`relative z-10 text-center transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Logo */}
        <div className="mb-8 animate-pulse-yellow">
          <Image
            src="/images/genesil-logo.png"
            alt="Genesil Autospares Logo"
            width={300}
            height={200}
            className="mx-auto drop-shadow-2xl"
            priority
          />
        </div>

        {/* Company Name */}
        <h1 className="text-4xl md:text-6xl font-bold text-black mb-4 tracking-wide">GENESIL</h1>
        <p className="text-xl md:text-2xl text-black/80 font-medium mb-8">AUTOSPARES & ACCESSORIES LTD</p>

        {/* Loading indicator */}
        <div className="flex justify-center items-center space-x-2">
          <div className="w-3 h-3 bg-black rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-black rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-black rounded-full animate-bounce delay-200"></div>
        </div>

        <p className="text-black/70 mt-4 text-lg">Loading your automotive experience...</p>
      </div>
    </div>
  )
}
