"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "../context/CartContext"
import { useToast } from "@/hooks/use-toast"
import { Smartphone, CheckCircle, Loader2, User, MapPin } from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [paymentStep, setPaymentStep] = useState<"details" | "payment" | "processing">("details")
  const [checkoutRequestId, setCheckoutRequestId] = useState("")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    county: "",
    postalCode: "",
    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPaymentStep("payment")
  }

  const initiateMpesaPayment = async () => {
    setIsProcessing(true)
    setPaymentStep("processing")

    try {
      const orderReference = `GEN-${Date.now().toString().slice(-6)}`
      const totalAmount = Math.round(subtotal + shipping + tax)

      const response = await fetch("/api/mpesa/stk-push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: formData.phone,
          amount: totalAmount,
          orderReference: orderReference,
        }),
      })

      const data = await response.json()

      if (data.ResponseCode === "0") {
        setCheckoutRequestId(data.CheckoutRequestID)
        toast({
          title: "Payment Request Sent!",
          description: "Please check your phone and enter your M-Pesa PIN to complete the payment.",
        })

        // Simulate successful payment after 5 seconds for demo
        setTimeout(() => {
          setOrderPlaced(true)
          setIsProcessing(false)
          clearCart()
          toast({
            title: "Payment Successful!",
            description: "Your order has been confirmed and will be processed shortly.",
          })
        }, 5000)
      } else {
        throw new Error(data.ResponseDescription || "Payment initiation failed")
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
      setPaymentStep("payment")
      setIsProcessing(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="py-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="text-center border-l-4 border-yellow-400">
              <CardContent className="p-12">
                <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-black mb-4">Order Confirmed!</h1>
                <p className="text-xl text-gray-600 mb-6">
                  Thank you for your payment. We'll send you a confirmation email shortly.
                </p>
                <div className="bg-yellow-50 rounded-lg p-6 mb-6 border border-yellow-200">
                  <h3 className="text-lg font-semibold mb-2 text-black">Order Number</h3>
                  <p className="text-2xl font-bold text-yellow-600">#GEN-{Date.now().toString().slice(-6)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600">
                    <strong>Payment made to:</strong> +254722683434
                  </p>
                </div>
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  Track Your Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const subtotal = getTotal()
  const shipping = 500
  const tax = subtotal * 0.16
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black mb-8">Checkout</h1>

          {paymentStep === "processing" && (
            <Card className="mb-8 border-l-4 border-yellow-400">
              <CardContent className="p-8 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-black">Processing Payment</h3>
                <p className="text-gray-600 mb-4">
                  Please check your phone for the M-Pesa payment request and enter your PIN to complete the transaction.
                </p>
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <p className="text-sm text-black">
                    <strong>Amount:</strong> KES {total.toLocaleString()}
                    <br />
                    <strong>Phone:</strong> {formData.phone}
                    <br />
                    <strong>Payment to:</strong> +254722683434
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {paymentStep === "details" && (
                <form onSubmit={handleDetailsSubmit}>
                  {/* Personal Information */}
                  <Card className="mb-6 border-l-4 border-yellow-400">
                    <CardHeader>
                      <CardTitle className="flex items-center text-black">
                        <User className="h-5 w-5 mr-2" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">M-Pesa Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="0712345678"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                        <p className="text-sm text-gray-600 mt-1">Enter your M-Pesa registered phone number</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Delivery Address */}
                  <Card className="mb-6 border-l-4 border-yellow-400">
                    <CardHeader>
                      <CardTitle className="flex items-center text-black">
                        <MapPin className="h-5 w-5 mr-2" />
                        Delivery Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <input
                          type="text"
                          name="address"
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                          <input
                            type="text"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">County</label>
                          <input
                            type="text"
                            name="county"
                            required
                            value={formData.county}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Order Notes (Optional)</label>
                        <textarea
                          name="notes"
                          rows={3}
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Any special instructions for your order..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                  >
                    Continue to Payment
                  </Button>
                </form>
              )}

              {paymentStep === "payment" && (
                <Card className="border-l-4 border-yellow-400">
                  <CardHeader>
                    <CardTitle className="flex items-center text-black">
                      <Smartphone className="h-5 w-5 mr-2" />
                      M-Pesa Payment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Secure M-Pesa Payment</h4>
                      <p className="text-green-700 text-sm">
                        You will receive an STK push notification on your phone to complete the payment securely.
                        Payment will be made to +254722683434.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone Number:</span>
                        <span className="font-semibold">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount to Pay:</span>
                        <span className="font-semibold text-lg">KES {total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment to:</span>
                        <span className="font-semibold">+254722683434</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={initiateMpesaPayment}
                        disabled={isProcessing}
                        size="lg"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Smartphone className="h-4 w-4 mr-2" />
                            Pay with M-Pesa
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => setPaymentStep("details")}
                        variant="outline"
                        size="lg"
                        className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                      >
                        Back to Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-8 border-l-4 border-yellow-400">
                <CardHeader>
                  <CardTitle className="text-black">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-black">{item.name}</h4>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-semibold">KES {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">KES {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery</span>
                      <span className="font-semibold">KES {shipping.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">VAT (16%)</span>
                      <span className="font-semibold">KES {Math.round(tax).toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>KES {Math.round(total).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-sm text-gray-600 pt-4">
                    <Smartphone className="h-4 w-4 inline mr-1" />
                    Secure M-Pesa payment to +254722683434
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
