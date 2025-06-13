import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Users, BarChart3, Globe, Lock } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with end-to-end encryption and compliance standards.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with sub-second response times and global CDN.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Seamless collaboration tools for teams of all sizes and structures.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive insights and reporting to drive data-driven decisions.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Worldwide infrastructure ensuring reliability and performance everywhere.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your data stays yours with transparent privacy policies and controls.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to succeed, built with the latest technology and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
