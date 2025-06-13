"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { DraggableChatBot } from "@/components/draggable-chatbot"
import Image from "next/image"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle")
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus("idle")

    try {
      // Submit to Formspree with the correct endpoint
      const response = await fetch("https://formspree.io/f/mblyowgb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormStatus("success")
        toast({
          title: "Message sent!",
          description: "Thank you for your message. We'll get back to you soon.",
        })
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        setFormStatus("error")
        throw new Error("Failed to send message")
      }
    } catch (error) {
      setFormStatus("error")
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or call us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto dark:text-gray-300">
              Get in touch with us for all your auto parts needs. We're here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {formStatus === "success" ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                    <Button
                      onClick={() => setFormStatus("idle")}
                      className="bg-yellow-400 text-black hover:bg-yellow-500"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} method="POST" className="space-y-4">
                    {formStatus === "error" && (
                      <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4 flex items-start">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-red-600 dark:text-red-400 text-sm">
                          There was an error sending your message. Please try again or contact us directly by phone.
                        </p>
                      </div>
                    )}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name *
                      </label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone
                      </label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-yellow-400 mr-3 mt-1" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-muted-foreground dark:text-gray-300">+254 722 683 434</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-yellow-400 mr-3 mt-1" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground dark:text-gray-300">info@genesil.co.ke</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-yellow-400 mr-3 mt-1" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-muted-foreground dark:text-gray-300">
                          Kirinyaga Road
                          <br />
                          Nairobi, Kenya
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-yellow-400 mr-3 mt-1" />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-muted-foreground dark:text-gray-300">
                          Monday - Friday: 8:00 AM - 6:00 PM
                          <br />
                          Saturday: 8:00 AM - 4:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-yellow-400 text-black">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Visit Our Store</h3>
                  <p className="mb-4">
                    Located in the heart of Nairobi's automotive district on Kirinyaga Road. Easy to find and accessible
                    by public transport.
                  </p>
                  <p className="font-medium">Free parking available for customers</p>
                </CardContent>
              </Card>

              {/* Map */}
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video w-full">
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
                  <div className="p-4 text-center">
                    <a
                      href="https://maps.app.goo.gl/BwtRRM1Vd1B7hdob9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2 bg-yellow-400 text-black rounded-lg font-medium hover:bg-yellow-500 transition-colors"
                    >
                      Get Directions
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <DraggableChatBot />
    </div>
  )
}
