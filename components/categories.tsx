import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const categories = [
  {
    name: "Brake Systems",
    description: "High-performance brake pads, rotors, and complete systems",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Performance Parts",
    description: "Upgrade your vehicle with premium performance components",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Accessories",
    description: "Interior and exterior accessories for style and function",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Tools & Equipment",
    description: "Professional-grade tools for maintenance and repairs",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function Categories() {
  return (
    <section id="categories" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop By Category</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our extensive collection of quality auto parts and accessories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <Button
                  variant="outline"
                  className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                >
                  View Products <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
