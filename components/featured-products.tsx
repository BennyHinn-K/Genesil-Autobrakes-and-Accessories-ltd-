"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Eye, Heart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Product {
  id: string
  name: string
  price: number
  image: string
  rating: number
  category: string
  featured: boolean
  description?: string
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      // Load products from localStorage or use default
      const savedProducts = localStorage.getItem("genesil_products")
      if (savedProducts) {
        const allProducts = JSON.parse(savedProducts)
        setProducts(allProducts.filter((p: Product) => p.featured).slice(0, 8))
      } else {
        // Default featured products
        const defaultProducts = [
          {
            id: "1",
            name: "Toyota Brake Pads - Premium Quality",
            price: 3500,
            image: "/placeholder.svg?height=200&width=200",
            rating: 5,
            category: "Brake Parts",
            featured: true,
            description: "High-performance brake pads for Toyota vehicles",
          },
          {
            id: "2",
            name: "Nissan Oil Filter - Genuine",
            price: 1200,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4,
            category: "Filters",
            featured: true,
            description: "Genuine oil filter for Nissan engines",
          },
          {
            id: "3",
            name: "Subaru Spark Plugs - Performance",
            price: 2800,
            image: "/placeholder.svg?height=200&width=200",
            rating: 5,
            category: "Engine Parts",
            featured: true,
            description: "Premium spark plugs for Subaru engines",
          },
          {
            id: "4",
            name: "Mitsubishi Clutch Kit - Complete",
            price: 15000,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4,
            category: "Transmission",
            featured: true,
            description: "Complete clutch kit for Mitsubishi vehicles",
          },
          {
            id: "5",
            name: "Toyota Air Filter - OEM",
            price: 800,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4,
            category: "Filters",
            featured: true,
            description: "OEM air filter for Toyota engines",
          },
          {
            id: "6",
            name: "Nissan Brake Rotors - Heavy Duty",
            price: 4500,
            image: "/placeholder.svg?height=200&width=200",
            rating: 5,
            category: "Brake Parts",
            featured: true,
            description: "Heavy duty brake rotors for Nissan vehicles",
          },
          {
            id: "7",
            name: "Subaru Engine Oil - Synthetic",
            price: 3200,
            image: "/placeholder.svg?height=200&width=200",
            rating: 5,
            category: "Engine Parts",
            featured: true,
            description: "Premium synthetic engine oil for Subaru",
          },
          {
            id: "8",
            name: "Mitsubishi Timing Belt Kit",
            price: 8500,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4,
            category: "Engine Parts",
            featured: true,
            description: "Complete timing belt kit for Mitsubishi",
          },
        ]
        setProducts(defaultProducts)
        localStorage.setItem("genesil_products", JSON.stringify(defaultProducts))
      }
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="loading-skeleton h-8 w-64 mx-auto mb-4 rounded"></div>
            <div className="loading-skeleton h-4 w-96 mx-auto rounded"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="loading-skeleton h-80 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our most popular and trusted auto parts, chosen by mechanics across Kenya
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="overflow-hidden card-hover border-0 shadow-lg bg-white dark:bg-black group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                <Badge className="absolute top-3 right-3 bg-yellow-400 text-black font-semibold">Featured</Badge>
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[...Array(product.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">({product.rating})</span>
                </div>
                <h3 className="font-bold mb-2 line-clamp-2 text-lg group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 font-medium">{product.category}</p>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    KSh {product.price.toLocaleString()}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className="premium-button text-black font-semibold px-4 py-2 rounded-xl"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <Link href="/catalogue">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-yellow-400 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-300"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
