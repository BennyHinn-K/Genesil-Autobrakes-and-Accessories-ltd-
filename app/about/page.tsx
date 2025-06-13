import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, MapPin, Users, Award } from "lucide-react"
import { DraggableChatBot } from "@/components/draggable-chatbot"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="yellow-bg-pattern relative">
        <div className="logo-watermark">
          <Image
            src="/genesil-logo.png"
            alt=""
            fill
            className="opacity-5 object-contain"
            priority={false}
            onError={() => {
              // Silently fail if logo doesn't load for the watermark
              console.log("Logo watermark failed to load, continuing without it")
            }}
          />
        </div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Genesil</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your trusted spare parts supplier based in Kirinyaga Road, Nairobi — the heart of Kenya's auto scene.
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed mb-6 dark:text-white">
                Genesil Autobrake & Accessories Ltd is your trusted spare parts supplier based in Kirinyaga Road,
                Nairobi — the heart of Kenya's auto scene.
              </p>

              <p className="text-lg leading-relaxed mb-6 dark:text-white">
                We deal strictly in high-quality, genuine spare parts for a wide range of vehicles — from Toyota,
                Nissan, Subaru, and Mitsubishi to European brands. Whether you're fixing up a daily driver or running a
                garage, we've got the parts that keep engines running and customers happy.
              </p>

              <div className="bg-yellow-400 text-black p-8 rounded-2xl my-8">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg font-medium">
                  Deliver the right parts, at the right price, with zero compromise.
                </p>
              </div>

              <p className="text-lg leading-relaxed mb-6 dark:text-white">
                No fakes. No delays. No guesswork. Just real parts that work — the first time.
              </p>

              <p className="text-lg leading-relaxed mb-6 dark:text-white">
                Mechanics trust us. Car owners rely on us. And we show up every day to keep Nairobi moving.
              </p>

              <div className="text-center bg-gray-900 text-white p-8 rounded-2xl my-8">
                <h2 className="text-3xl font-bold text-yellow-400 mb-2">Genesil Autobrake.</h2>
                <p className="text-xl">Real parts. Real performance. No excuses.</p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Genuine Parts Only</h3>
                <p className="text-muted-foreground dark:text-gray-300">
                  We deal strictly in high-quality, genuine spare parts
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <MapPin className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Prime Location</h3>
                <p className="text-muted-foreground dark:text-gray-300">
                  Located on Kirinyaga Road, heart of Kenya's auto scene
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Trusted by Many</h3>
                <p className="text-muted-foreground dark:text-gray-300">Mechanics trust us, car owners rely on us</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-muted-foreground dark:text-gray-300">Zero compromise on quality and performance</p>
              </CardContent>
            </Card>
          </div>

          {/* Brands Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-8">Brands We Support</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-semibold">Toyota</h3>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-semibold">Nissan</h3>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-semibold">Subaru</h3>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-semibold">Mitsubishi</h3>
              </div>
            </div>
            <p className="text-muted-foreground mt-4 dark:text-gray-300">And many European brands</p>
          </div>

          {/* Location Map */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Find Us</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
              <div className="aspect-video w-full rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8177756666745!2d36.82636999999999!3d-1.2833333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d8eeeee6eb%3A0x9f006a7d3482e1d8!2sKirinyaga%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1718122345678!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[400px]"
                  onError={(e) => {
                    // Handle iframe loading error
                    const target = e.target as HTMLIFrameElement
                    if (target) {
                      target.style.display = "none"
                      const parent = target.parentElement
                      if (parent) {
                        const fallback = document.createElement("div")
                        fallback.className =
                          "w-full h-full min-h-[400px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                        fallback.innerHTML =
                          '<p class="text-center">Map loading failed. Please visit <a href="https://maps.app.goo.gl/BwtRRM1Vd1B7hdob9" target="_blank" rel="noopener noreferrer" class="text-yellow-600 dark:text-yellow-400 underline">Google Maps</a> directly.</p>'
                        parent.appendChild(fallback)
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-4 p-4 text-center">
                <h3 className="text-xl font-semibold mb-2">Genesil Autobrake and Accessories LTD</h3>
                <p className="text-muted-foreground dark:text-gray-300">Kirinyaga Road, Nairobi, Kenya</p>
                <a
                  href="https://maps.app.goo.gl/BwtRRM1Vd1B7hdob9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-2 bg-yellow-400 text-black rounded-lg font-medium hover:bg-yellow-500 transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <DraggableChatBot />
    </div>
  )
}
