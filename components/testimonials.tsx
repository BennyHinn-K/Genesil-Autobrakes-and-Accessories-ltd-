import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Michael Johnson",
    location: "Certified Mechanic, Detroit",
    content:
      "I've been using Genesil brake systems in my shop for over 5 years. The quality is consistently excellent, and my customers are always satisfied with the performance.",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    location: "Car Enthusiast, Chicago",
    content:
      "After installing Genesil performance rotors and pads, the difference in braking performance was immediately noticeable. Great products at reasonable prices!",
    rating: 5,
  },
  {
    name: "Robert Chen",
    location: "Auto Shop Owner, Los Angeles",
    content:
      "The customer service at Genesil is outstanding. They helped me find exactly what I needed for a rare vehicle model, and shipping was faster than expected.",
    rating: 4,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-medium text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.location}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
