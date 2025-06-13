import { Card, CardContent } from "@/components/ui/card"
import { Shield, Truck, Users, Award, Clock, MapPin, CheckCircle, Star } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Genuine Parts Guarantee",
    description: "We deal strictly in high-quality, genuine spare parts. No fakes, no compromises.",
    color: "from-yellow-400 to-yellow-500",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick delivery across Nairobi and Kenya. Get your parts when you need them.",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: Users,
    title: "Trusted by Mechanics",
    description: "Mechanics trust us. Car owners rely on us. Join thousands of satisfied customers.",
    color: "from-yellow-400 to-yellow-500",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Every part is tested and verified. We stand behind the quality of our products.",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: Clock,
    title: "Expert Support",
    description: "Our team provides professional advice and technical support for all your needs.",
    color: "from-yellow-400 to-yellow-500",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    description: "Located on Kirinyaga Road, Nairobi - the heart of Kenya's automotive scene.",
    color: "from-yellow-500 to-yellow-600",
  },
]

const stats = [
  { number: "5000+", label: "Happy Customers" },
  { number: "10000+", label: "Parts in Stock" },
  { number: "15+", label: "Years Experience" },
  { number: "99%", label: "Customer Satisfaction" },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Why Choose Genesil?
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            We deliver the right parts, at the right price, with zero compromise. Here's what makes us different.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-6 mb-4">
                <h3 className="text-3xl md:text-4xl font-bold text-black">{stat.number}</h3>
              </div>
              <p className="text-sm font-semibold text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg card-hover bg-white dark:bg-black group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <feature.icon className="h-10 w-10 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="text-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black rounded-3xl p-12 mb-16 animate-fade-in">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h3>
          <p className="text-xl md:text-2xl font-semibold max-w-4xl mx-auto leading-relaxed">
            Deliver the right parts, at the right price, with zero compromise. No fakes. No delays. No guesswork. Just
            real parts that work — the first time.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center animate-slide-up">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-lg font-bold mb-2">Verified Quality</h4>
            <p className="text-muted-foreground">All parts undergo rigorous quality checks</p>
          </div>
          <div className="text-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-white fill-current" />
            </div>
            <h4 className="text-lg font-bold mb-2">5-Star Service</h4>
            <p className="text-muted-foreground">Exceptional customer service every time</p>
          </div>
          <div className="text-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-lg font-bold mb-2">Industry Leader</h4>
            <p className="text-muted-foreground">Recognized as Kenya's top auto parts supplier</p>
          </div>
        </div>
      </div>
    </section>
  )
}
