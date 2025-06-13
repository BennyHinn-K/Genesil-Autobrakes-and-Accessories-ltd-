"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, CreditCard, ShoppingCart, ArrowLeft } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { DraggableChatBot } from "@/components/draggable-chatbot"
import Link from "next/link"

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart()
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleMpesaPayment = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checkout.",
        variant: "destructive",
      })
      return
    }

    setIsProcessingPayment(true)
    setPaymentError(null)

    // Simulate M-Pesa payment process
    try {
      // In a real implementation, this would integrate with M-Pesa API
      const paymentData = {
        paybill: "254226834",
        amount: total,
        description: `Genesil Auto Parts - ${items.length} items`,
        items: items.map((item) => `${item.name} (${item.quantity})`).join(", "),
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "Payment initiated",
        description: `Please complete payment of KSh ${total.toLocaleString()} to Paybill 254226834. You will receive an M-Pesa prompt shortly.`,
      })

      // Clear cart after successful payment initiation
      clearCart()
    } catch (error) {
      setPaymentError("There was an error processing your payment. Please try again or contact customer support.")
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessingPayment(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-12 w-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Add some auto parts to get started!</p>
            <Link href="/catalogue">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
        <DraggableChatBot />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({items.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          // Fallback for image loading errors
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=64&width=64"
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">KSh {item.price.toLocaleString()} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)}
                          className="w-16 text-center"
                          min="1"
                          aria-label="Quantity"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">KSh {(item.price * item.quantity).toLocaleString()}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>KSh {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span>{total >= 5000 ? "Free" : "KSh 500"}</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>KSh {(total >= 5000 ? total : total + 500).toLocaleString()}</span>
                </div>

                {paymentError && (
                  <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 text-sm text-red-600 dark:text-red-400">
                    {paymentError}
                  </div>
                )}

                <Button
                  onClick={handleMpesaPayment}
                  disabled={isProcessingPayment}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {isProcessingPayment ? "Processing..." : "Pay with M-Pesa"}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Paybill: 254226834</p>
                  <p>Secure M-Pesa payment</p>
                </div>

                <Button variant="outline" onClick={clearCart} className="w-full">
                  Clear Cart
                </Button>
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card className="mt-4">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Payment Information</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Pay via M-Pesa to Paybill 254226834</p>
                  <p>• Free delivery on orders over KSh 5,000</p>
                  <p>• Delivery within 1-2 business days</p>
                  <p>• All parts come with warranty</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
      <DraggableChatBot />
    </div>
  )
}
