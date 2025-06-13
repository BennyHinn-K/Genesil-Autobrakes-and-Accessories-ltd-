import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wrench, Truck, Clock, Shield } from "lucide-react"

const services = [
  {
    icon: Wrench,
    title: "Brake Installation",
    description: "Professional installation of brake systems by certified technicians",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Same-day shipping on orders placed before 2 PM",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Technical assistance and customer support whenever you need it",
  },
  {
    icon: Shield,
    title: "Warranty",
    description: "All products backed by our comprehensive warranty program",
  },
]

export function Services() {
  return (
    <section id="services" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We offer comprehensive services to keep your vehicle running at peak performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-red-600 hover:bg-red-700">
            Schedule Service
          </Button>
        </div>
      </div>
    </section>
  )
}
