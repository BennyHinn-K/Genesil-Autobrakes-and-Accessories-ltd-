"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Minimize2, Maximize2, Bot } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

interface Product {
  id: string
  name: string
  price: number
  image: string
  rating: number
  category: string
  description: string
  featured: boolean
  inStock?: boolean
  stockQuantity?: number
}

export function DraggableChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Genesil AI assistant. I can help you find the perfect auto parts for your vehicle. What can I help you with today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const chatRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Load products from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem("genesil_products")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      // Default products if none exist
      const defaultProducts = [
        {
          id: "1",
          name: "Toyota Brake Pads",
          price: 3500,
          image: "/placeholder.svg?height=200&width=200",
          rating: 5,
          category: "Brake Parts",
          description: "High-quality brake pads for Toyota vehicles",
          featured: true,
          inStock: true,
          stockQuantity: 25,
        },
        {
          id: "2",
          name: "Nissan Oil Filter",
          price: 1200,
          image: "/placeholder.svg?height=200&width=200",
          rating: 4,
          category: "Filters",
          description: "Genuine oil filter for Nissan engines",
          featured: true,
          inStock: true,
          stockQuantity: 42,
        },
        {
          id: "3",
          name: "Subaru Spark Plugs",
          price: 2800,
          image: "/placeholder.svg?height=200&width=200",
          rating: 5,
          category: "Engine Parts",
          description: "Premium spark plugs for Subaru engines",
          featured: true,
          inStock: false,
          stockQuantity: 0,
        },
      ]
      setProducts(defaultProducts)
    }
  }, [])

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // Set initial position to bottom right
    const updatePosition = () => {
      setPosition({
        x: Math.max(0, window.innerWidth - (isMobile ? 320 : 400)),
        y: Math.max(0, window.innerHeight - (isMinimized ? 80 : 600)),
      })
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)
    return () => window.removeEventListener("resize", updatePosition)
  }, [isMobile, isMinimized])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return // Disable dragging on mobile

    if (e.target === e.currentTarget || (e.target as HTMLElement).closest(".drag-handle")) {
      setIsDragging(true)
      const rect = chatRef.current?.getBoundingClientRect()
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = Math.max(0, Math.min(window.innerWidth - (isMobile ? 320 : 380), e.clientX - dragOffset.x))
      const newY = Math.max(0, Math.min(window.innerHeight - (isMinimized ? 80 : 600), e.clientY - dragOffset.y))
      setPosition({ x: newX, y: newY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile) return // Disable dragging on mobile

    if (e.target === e.currentTarget || (e.target as HTMLElement).closest(".drag-handle")) {
      const touch = e.touches[0]
      const rect = chatRef.current?.getBoundingClientRect()
      if (rect && touch) {
        setDragOffset({
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        })
      }
    }
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  // Function to search products by name, category, or description
  const searchProducts = (query: string): Product[] => {
    const lowerQuery = query.toLowerCase()
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery) ||
        (product.description && product.description.toLowerCase().includes(lowerQuery)),
    )
  }

  // Function to get product details by name or partial match
  const getProductDetails = (productName: string): Product | null => {
    const lowerName = productName.toLowerCase()
    return (
      products.find((p) => p.name.toLowerCase() === lowerName) ||
      products.find((p) => p.name.toLowerCase().includes(lowerName))
    )
  }

  // Function to get products by category
  const getProductsByCategory = (category: string): Product[] => {
    const lowerCategory = category.toLowerCase()
    return products.filter((p) => p.category.toLowerCase().includes(lowerCategory))
  }

  // Function to format product information
  const formatProductInfo = (product: Product): string => {
    const stockStatus = product.inStock ? `In Stock (${product.stockQuantity} available)` : "Out of Stock"

    return `${product.name}
Price: KSh ${product.price.toLocaleString()}
Category: ${product.category}
Status: ${stockStatus}
${product.description ? `\nDescription: ${product.description}` : ""}`
  }

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    // Check for product price inquiries
    if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("how much")) {
      // Check if asking about a specific product
      for (const product of products) {
        if (lowerInput.includes(product.name.toLowerCase())) {
          return `The price of ${product.name} is KSh ${product.price.toLocaleString()}. ${
            product.inStock
              ? `It's currently in stock (${product.stockQuantity} available).`
              : "It's currently out of stock."
          } Would you like to know more about this product?`
        }
      }

      // General price inquiry
      return "Our prices are competitive and we offer genuine parts only. You can browse our catalogue to see current prices, or tell me what specific part you need for a personalized quote. We also offer bulk discounts for garages and mechanics."
    }

    // Check for stock availability inquiries
    if (
      lowerInput.includes("stock") ||
      lowerInput.includes("available") ||
      lowerInput.includes("in stock") ||
      lowerInput.includes("out of stock")
    ) {
      // Check if asking about a specific product
      for (const product of products) {
        if (lowerInput.includes(product.name.toLowerCase())) {
          return product.inStock
            ? `Yes, ${product.name} is currently in stock. We have ${product.stockQuantity} units available. Would you like to add it to your cart?`
            : `I'm sorry, ${product.name} is currently out of stock. Would you like me to suggest an alternative or notify you when it's back in stock?`
        }
      }

      // General stock inquiry
      return "We maintain a large inventory of genuine auto parts. Please let me know which specific part you're interested in, and I can check its availability for you."
    }

    // Check for specific product inquiries
    for (const product of products) {
      if (lowerInput.includes(product.name.toLowerCase())) {
        return formatProductInfo(product) + "\n\nWould you like to add this to your cart or learn more about it?"
      }
    }

    // Check for category inquiries
    if (lowerInput.includes("brake") || lowerInput.includes("brakes")) {
      const brakeProducts = getProductsByCategory("Brake")
      if (brakeProducts.length > 0) {
        const inStockCount = brakeProducts.filter((p) => p.inStock).length
        let response = `We have ${brakeProducts.length} brake products in our catalogue, with ${inStockCount} currently in stock. Here are some examples:\n\n`

        brakeProducts.slice(0, 3).forEach((product) => {
          response += `- ${product.name}: KSh ${product.price.toLocaleString()} (${product.inStock ? "In Stock" : "Out of Stock"})\n`
        })

        response += "\nWould you like more details about any of these products?"
        return response
      }

      return "We have a comprehensive selection of brake parts including brake pads, rotors, brake fluid, and complete brake systems for Toyota, Nissan, Subaru, and Mitsubishi. Our brake parts are 100% genuine and come with warranty. Would you like to see our brake catalogue?"
    }

    if (lowerInput.includes("engine") || lowerInput.includes("motor")) {
      const engineProducts = getProductsByCategory("Engine")
      if (engineProducts.length > 0) {
        const inStockCount = engineProducts.filter((p) => p.inStock).length
        let response = `We have ${engineProducts.length} engine parts in our catalogue, with ${inStockCount} currently in stock. Here are some examples:\n\n`

        engineProducts.slice(0, 3).forEach((product) => {
          response += `- ${product.name}: KSh ${product.price.toLocaleString()} (${product.inStock ? "In Stock" : "Out of Stock"})\n`
        })

        response += "\nWould you like more details about any of these products?"
        return response
      }

      return "We offer a wide range of engine parts including spark plugs, oil filters, timing belts, and more. All our engine parts are genuine and come with warranty. What specific engine part are you looking for?"
    }

    if (lowerInput.includes("filter") || lowerInput.includes("filters")) {
      const filterProducts = getProductsByCategory("Filter")
      if (filterProducts.length > 0) {
        const inStockCount = filterProducts.filter((p) => p.inStock).length
        let response = `We have ${filterProducts.length} filters in our catalogue, with ${inStockCount} currently in stock. Here are some examples:\n\n`

        filterProducts.slice(0, 3).forEach((product) => {
          response += `- ${product.name}: KSh ${product.price.toLocaleString()} (${product.inStock ? "In Stock" : "Out of Stock"})\n`
        })

        response += "\nWould you like more details about any of these products?"
        return response
      }

      return "We stock all types of filters including oil filters, air filters, fuel filters, and cabin filters for various vehicle makes and models. Our filters are genuine and ensure optimal performance. What type of filter are you looking for?"
    }

    // Check for brand-specific inquiries
    if (lowerInput.includes("toyota")) {
      return "We stock genuine Toyota parts including filters, brake components, engine parts, transmission parts, and more. Our Toyota parts are sourced directly from authorized dealers. Which Toyota model do you have and what specific part do you need?"
    }

    if (lowerInput.includes("nissan")) {
      return "Our Nissan parts inventory includes engine components, brake systems, filters, electrical parts, and suspension components. All parts are genuine and come with manufacturer warranty. What Nissan part can I help you find?"
    }

    if (lowerInput.includes("subaru")) {
      return "We carry authentic Subaru parts including engine components, brake systems, performance parts, and AWD system components. What Subaru model are you working on and what part do you need?"
    }

    if (lowerInput.includes("mitsubishi")) {
      return "Our Mitsubishi parts selection includes engine parts, brake components, transmission parts, and electrical components. How can I assist with your Mitsubishi vehicle?"
    }

    // Check for general inquiries
    if (lowerInput.includes("delivery") || lowerInput.includes("shipping")) {
      return "We offer fast delivery across Nairobi and Kenya. Free delivery on orders over KSh 5,000. Delivery usually takes 1-2 business days within Nairobi and 2-3 days for other parts of Kenya. We also offer same-day delivery for urgent orders."
    }

    if (lowerInput.includes("location") || lowerInput.includes("where") || lowerInput.includes("address")) {
      return "We're located on Kirinyaga Road, Nairobi - the heart of Kenya's automotive scene. You can visit us in person or call +254 722 683 434 for directions. We're open Monday to Friday: 8:00 AM - 6:00 PM, Saturday: 8:00 AM - 4:00 PM."
    }

    if (lowerInput.includes("warranty") || lowerInput.includes("guarantee")) {
      return "All our genuine parts come with manufacturer warranty. We stand behind the quality of every part we sell. Warranty periods vary by part and manufacturer, typically ranging from 6 months to 2 years. We also offer our own quality guarantee."
    }

    if (lowerInput.includes("payment") || lowerInput.includes("mpesa") || lowerInput.includes("pay")) {
      return "We accept various payment methods including M-Pesa (Paybill: 254226834), cash, and bank transfers. For online orders, you can pay via M-Pesa and we'll process your order immediately. We also offer credit terms for registered garages."
    }

    if (lowerInput.includes("catalogue") || lowerInput.includes("products") || lowerInput.includes("parts")) {
      return "You can browse our complete catalogue on our website. We have thousands of parts for Toyota, Nissan, Subaru, Mitsubishi, and European brands. Use our search function to find specific parts or browse by category. Would you like me to help you find something specific?"
    }

    if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
      return "Hello! Welcome to Genesil Autobrake & Accessories. I'm here to help you find the perfect auto parts for your vehicle. Whether you need brake parts, engine components, filters, or any other genuine parts, I can assist you. What can I help you with today?"
    }

    if (lowerInput.includes("thank") || lowerInput.includes("thanks")) {
      return "You're welcome! I'm always here to help with your auto parts needs. If you have any other questions about our products, services, or need help finding specific parts, feel free to ask. Have a great day!"
    }

    // Search for products based on the input
    const searchResults = searchProducts(input)
    if (searchResults.length > 0) {
      let response = `I found ${searchResults.length} products that match your query. Here are some options:\n\n`

      searchResults.slice(0, 3).forEach((product) => {
        response += `- ${product.name}: KSh ${product.price.toLocaleString()} (${product.inStock ? "In Stock" : "Out of Stock"})\n`
      })

      if (searchResults.length > 3) {
        response += `\n...and ${searchResults.length - 3} more products.`
      }

      response += "\n\nWould you like more details about any of these products?"
      return response
    }

    return "I can help you find auto parts for Toyota, Nissan, Subaru, Mitsubishi and European brands. You can ask about specific products, prices, stock availability, delivery options, our location, warranty information, or payment methods. What specific information would you like to know?"
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-black text-yellow-400 hover:bg-gray-800 shadow-2xl z-50 animate-pulse-glow will-change-transform"
        style={{ transform: "none" }}
        aria-label="Open chat assistant"
      >
        <MessageCircle className="h-8 w-8" />
      </Button>
    )
  }

  return (
    <div
      ref={chatRef}
      className={`fixed z-50 ${isMinimized ? "h-16" : "h-[600px]"} ${
        isMobile ? "w-[320px]" : "w-[380px]"
      } shadow-2xl border-2 border-yellow-400 rounded-2xl overflow-hidden transition-all duration-300 will-change-transform`}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: isDragging ? "scale(1.02)" : "scale(1)",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div
        className="bg-black text-yellow-400 p-4 flex items-center justify-between drag-handle cursor-move"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="flex items-center">
          <Bot className="h-6 w-6 mr-3" />
          <h3 className="font-bold text-lg">Genesil Assistant</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-yellow-400 hover:bg-gray-800 h-8 w-8"
            aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-yellow-400 hover:bg-gray-800 h-8 w-8"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-900 h-[calc(100%-120px)]">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.isBot
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      : "bg-yellow-400 text-black"
                  }`}
                >
                  {message.text.split("\n").map((line, i) => (
                    <div key={i}>{line || <br />}</div>
                  ))}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex space-x-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about auto parts..."
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-yellow-400 text-black hover:bg-yellow-500"
                disabled={isTyping || !inputValue.trim()}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
              <Link href="/catalogue" className="hover:text-yellow-600 dark:hover:text-yellow-400">
                Browse our full catalogue →
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
