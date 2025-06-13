"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingCart, Search, CheckCircle, XCircle } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { DraggableChatBot } from "@/components/draggable-chatbot"

interface Product {
  id: string
  name: string
  price: number
  image: string
  rating: number
  category: string
  description: string
  featured: boolean
  inStock: boolean
  stockQuantity: number
}

export default function CataloguePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [stockFilter, setStockFilter] = useState("all")
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    // Load products from localStorage or use default
    const savedProducts = localStorage.getItem("genesil_products")
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts)
      // Add inStock and stockQuantity if they don't exist
      const updatedProducts = parsedProducts.map((product: any) => ({
        ...product,
        inStock: product.inStock !== undefined ? product.inStock : true,
        stockQuantity: product.stockQuantity !== undefined ? product.stockQuantity : 10,
      }))
      setProducts(updatedProducts)
      localStorage.setItem("genesil_products", JSON.stringify(updatedProducts))
    } else {
      // Default products
      const defaultProducts = [
        {
          id: "1",
          name: "Toyota Brake Pads",
          price: 3500,
          image: "/placeholder.svg?height=200&width=200",
          rating: 5,
          category: "Brake Parts",
          description: "High-quality brake pads for Toyota vehicles",
          featured: true,
          inStock: true,
          stockQuantity: 15,
        },
        {
          id: "2",
          name: "Nissan Oil Filter",
          price: 1200,
          image: "/placeholder.svg?height=200&width=200",
          rating: 4,
          category: "Filters",
          description: "Genuine oil filter for Nissan engines",
          featured: true,
          inStock: true,
          stockQuantity: 25,
        },
        {
          id: "3",
          name: "Subaru Spark Plugs",
          price: 2800,
          image: "/placeholder.svg?height=200&width=200",
          rating: 5,
          category: "Engine Parts",
          description: "Premium spark plugs for Subaru engines",
          featured: true,
          inStock: false,
          stockQuantity: 0,
        },
        {
          id: "4",
          name: "Mitsubishi Clutch Kit",
          price: 15000,
          image: "/placeholder.svg?height=200&width=200",
          rating: 4,
          category: "Transmission",
          description: "Complete clutch kit for Mitsubishi vehicles",
          featured: true,
          inStock: true,
          stockQuantity: 5,
        },
        {
          id: "5",
          name: "Toyota Air Filter",
          price: 800,
          image: "/placeholder.svg?height=200&width=200",
          rating: 4,
          category: "Filters",
          description: "Air filter for Toyota engines",
          featured: false,
          inStock: true,
          stockQuantity: 30,
        },
        {
          id: "6",
          name: "Nissan Brake Rotors",
          price: 4500,
          image: "/placeholder.svg?height=200&width=200",
          rating: 5,
          category: "Brake Parts",
          description: "Premium brake rotors for Nissan vehicles",
          featured: false,
          inStock: false,
          stockQuantity: 0,
        },
      ]
      setProducts(defaultProducts)
      localStorage.setItem("genesil_products", JSON.stringify(defaultProducts))
    }
  }, [])

  useEffect(() => {
    let filtered = products

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by stock status
    if (stockFilter !== "all") {
      filtered = filtered.filter((product) => (stockFilter === "instock" ? product.inStock : !product.inStock))
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, sortBy, stockFilter])

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) {
      toast({
        title: "Out of stock",
        description: `${product.name} is currently out of stock.`,
        variant: "destructive",
      })
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Product Catalogue</h1>
          <p className="text-lg text-muted-foreground">Browse our extensive collection of genuine auto parts</p>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={stockFilter} onValueChange={setStockFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Stock status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="instock">In Stock Only</SelectItem>
              <SelectItem value="outofstock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden card-hover border-0 shadow-lg">
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=200&width=200"
                  }}
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  {product.featured && <Badge className="bg-yellow-400 text-black">Featured</Badge>}
                  {product.inStock ? (
                    <Badge className="bg-green-500 text-white flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" /> In Stock
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500 text-white flex items-center">
                      <XCircle className="h-3 w-3 mr-1" /> Out of Stock
                    </Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">({product.rating})</span>
                </div>
                <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-yellow-600">KSh {product.price.toLocaleString()}</span>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className={`${
                      product.inStock
                        ? "bg-yellow-400 text-black hover:bg-yellow-500"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    {product.inStock ? "Add" : "Sold Out"}
                  </Button>
                </div>
                {product.inStock && product.stockQuantity <= 5 && (
                  <p className="text-xs text-red-500 mt-2">Only {product.stockQuantity} left in stock!</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </main>

      <Footer />
      <DraggableChatBot />
    </div>
  )
}
