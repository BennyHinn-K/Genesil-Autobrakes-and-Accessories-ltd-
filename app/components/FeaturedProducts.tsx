import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Premium Brake Disc Set",
    price: 38999,
    originalPrice: 45499,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    category: "Brake Discs",
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
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular brake systems and accessories, trusted by professionals worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">SALE</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button size="sm" variant="secondary" className="rounded-full w-10 h-10 p-0">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-sm text-blue-600 font-medium mb-2">{product.category}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

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
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">KES {product.price}</span>
                      <span className="text-lg text-gray-500 line-through">KES {product.originalPrice}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/catalogue">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
