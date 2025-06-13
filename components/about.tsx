import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

const features = [
  "Premium quality parts and accessories",
  "Expert technical support",
  "Fast nationwide shipping",
  "Comprehensive warranty program",
]

export function About() {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Genesil Auto Brake and Accessories</h2>
            <p className="text-lg text-gray-600 mb-6">
              Since 2005, Genesil Auto has been a trusted provider of high-quality brake systems, performance parts, and
              automotive accessories. We pride ourselves on offering premium products at competitive prices, backed by
              exceptional customer service.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our team of automotive experts is passionate about helping customers find the right parts for their
              vehicles. Whether you're a professional mechanic or a DIY enthusiast, we have the products and expertise
              to meet your needs.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-red-600 mr-3" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="bg-red-600 hover:bg-red-700">Learn More About Us</Button>
          </div>

          <div className="order-1 lg:order-2">
            <img src="/placeholder.svg?height=400&width=600" alt="Genesil Auto Shop" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
