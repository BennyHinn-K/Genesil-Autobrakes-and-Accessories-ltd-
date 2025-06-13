"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Truck, Clock, Sparkles, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 dark:from-black dark:via-gray-900 dark:to-black">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <Image
          src="/hero-image.png"
          alt="Auto parts background"
          fill
          style={{ objectFit: "cover" }}
          priority
          className="will-change-transform"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-transparent dark:from-yellow-400/10 dark:to-black/50"></div>

      {/* Floating Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-yellow-300/30 rounded-full animate-float"></div>
        <div
          className="absolute top-40 right-20 w-20 h-20 bg-yellow-400/40 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-16 h-16 bg-yellow-500/30 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-12 h-12 bg-yellow-600/20 rounded-full animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4 py-24 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left animate-fade-in">
              <div className="flex items-center mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-yellow-400/20 dark:bg-yellow-400/10 rounded-full border border-yellow-400/30 backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mr-2" />
                  <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                    #1 Premium Auto Parts Supplier
                  </span>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-black to-gray-800 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  Real Parts.
                </span>
                <br />
                <span className="bg-gradient-to-r from-gray-900 via-black to-gray-800 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  Real Performance.
                </span>
                <br />
                <span className="text-yellow-500 animate-pulse-glow">No Excuses.</span>
              </h1>

              <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
                Your trusted spare parts supplier in Nairobi. Genuine parts for Toyota, Nissan, Subaru, Mitsubishi and
                European brands. Experience excellence in every component.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">5000+ Happy Customers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">100% Genuine Parts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Fast Delivery</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/catalogue">
                  <Button
                    size="lg"
                    className="premium-button text-black font-semibold text-lg px-10 py-6 rounded-2xl shadow-2xl will-change-transform"
                  >
                    View Products
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-10 py-6 rounded-2xl border-2 border-yellow-400 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-lg"
                  >
                    Our Story
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Trust Indicators */}
            <div className="grid grid-cols-1 gap-6 animate-slide-up">
              <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-3xl p-8 premium-shadow card-hover">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Shield className="h-8 w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Genuine Parts Only</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      No fakes. No compromises. Just authentic parts that work perfectly every time.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-3xl p-8 premium-shadow card-hover"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Truck className="h-8 w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Lightning Fast Delivery</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Quick delivery across Nairobi and beyond. Get your parts when you need them most.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-3xl p-8 premium-shadow card-hover"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Clock className="h-8 w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Expert Support</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Professional advice from automotive experts who understand your needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
