"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Search } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useToast } from "@/hooks/use-toast"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ChatBot from "../components/ChatBot"

// Sample products data - in a real app, this would come from a database
const sampleProducts = [
  {
    id: 1,
    name: "Premium Brake Disc Set",
    price: 38999,
    originalPrice: 45499,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    category: "Brake Discs",
    brand: "Genesil Pro",
    inStock: true,
    description: "High-performance ventilated brake discs for superior stopping power",
  },
  {
    id: 2,
    name: "High-Performance Brake Pads",
    price: 11699,
    originalPrice: 14299,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 89,
    category: "Brake Pads",
    brand: "Genesil Pro",
    inStock: true,
    description: "Ceramic brake pads with excellent heat dissipation",
  },
  {
    id: 3,
    name: "Complete Brake Caliper Kit",
    price: 25999,
    originalPrice: 32499,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 156,
    category: "Brake Calipers",
    brand: "Genesil Elite",
    inStock: true,
    description: "Complete caliper assembly with mounting hardware",
  },
  {
    id: 4,
    name: "Brake Fluid DOT 4",
    price: 3249,
    originalPrice: 3899,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 78,
    category: "Fluids",
    brand: "Genesil",
    inStock: true,
    description: "High-quality DOT 4 brake fluid for all vehicle types",
  },
  {
    id: 5,
    name: "Sport Brake Disc Set",
    price: 51999,
    originalPrice: 58499,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 203,
    category: "Brake Discs",
    brand: "Genesil Sport",
    inStock: true,
    description: "Drilled and slotted brake discs for racing applications",
  },
  {
    id: 6,
    name: "Brake Pad Sensor Kit",
    price: 5979,
    originalPrice: 7279,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 67,
    category: "Accessories",
    brand: "Genesil",
    inStock: false,
    description: "Electronic brake pad wear sensors with wiring harness",
  },
]

const categories = ["All", "Brake Discs", "Brake Pads", "Brake Calipers", "Fluids", "Accessories"]
const brands = ["All", "Genesil", "Genesil Pro", "Genesil Elite", "Genesil Sport"]

export default function CataloguePage() {
  const [products, setProducts] = useState(sampleProducts)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const { addItem } = useCart()
  const { toast } = useToast()

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesBrand && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      category: product.category,
    })
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Product Catalogue</h1>
          <p className="text-xl text-muted-foreground">
            Discover our comprehensive range of automotive spare parts and accessories
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg shadow-sm p-6 mb-8 border-l-4 border-primary">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Brand Filter */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:border-primary hover:border-2 bg-card"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.originalPrice > product.price && (
                      <Badge className="bg-primary text-primary-foreground font-bold">SALE</Badge>
                    )}
                    {!product.inStock && <Badge variant="secondary">Out of Stock</Badge>}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-primary border-primary">
                      {product.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{product.brand}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-card-foreground">
                        KES {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-lg text-muted-foreground line-through">
                          KES {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold disabled:bg-muted"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
            <Button
              onClick={() => {
                setSelectedCategory("All")
                setSelectedBrand("All")
                setSearchTerm("")
              }}
              className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
      <ChatBot />
    </div>
  )
}
