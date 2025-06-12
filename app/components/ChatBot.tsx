"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, User, Bot } from "lucide-react"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Genesil customer care assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")

  const quickReplies = [
    "Product information",
    "Order status",
    "Technical support",
    "Warranty claims",
    "Installation guide",
  ]

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("product") || input.includes("brake")) {
      return "We offer a wide range of brake systems including brake discs, pads, calipers, and fluids. Would you like information about a specific product category?"
    } else if (input.includes("order") || input.includes("status")) {
      return "To check your order status, please provide your order number. You can also track your order through our website using the tracking link sent to your email."
    } else if (input.includes("technical") || input.includes("support")) {
      return "Our technical team is available 24/7 to assist you. For complex technical issues, would you like me to connect you with a specialist?"
    } else if (input.includes("warranty")) {
      return "All our products come with comprehensive warranty coverage. The warranty period varies by product type. Would you like specific warranty information for a particular product?"
    } else if (input.includes("installation")) {
      return "We provide detailed installation guides for all our products. We also offer professional installation services. Would you like installation instructions or to book an installation service?"
    } else {
      return "Thank you for your question. Let me help you with that. Could you please provide more details about what you're looking for?"
    }
  }

  const handleQuickReply = (reply: string) => {
    setInputText(reply)
  }

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-black hover:bg-gray-800 shadow-lg z-50 ${
          isOpen ? "hidden" : "flex"
        } items-center justify-center border-2 border-primary`}
      >
        <MessageCircle className="h-6 w-6 text-primary" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col bg-black border-2 border-primary">
          <CardHeader className="bg-black text-white rounded-t-lg border-b border-primary">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-white">Customer Care</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-gray-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-primary text-sm">We're here to help!</p>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 bg-black">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.isBot ? "flex-row" : "flex-row-reverse space-x-reverse"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.isBot ? "bg-primary/20" : "bg-gray-700"
                      }`}
                    >
                      {message.isBot ? (
                        <Bot className="h-4 w-4 text-primary" />
                      ) : (
                        <User className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`px-3 py-2 rounded-lg ${
                        message.isBot ? "bg-gray-800 text-white" : "bg-primary text-black"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            <div className="p-4 border-t border-gray-700">
              <p className="text-xs text-gray-400 mb-2">Quick replies:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs border-primary text-primary hover:bg-primary hover:text-black"
                  >
                    {reply}
                  </Button>
                ))}
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-gray-800 text-white placeholder-gray-400"
                />
                <Button onClick={handleSendMessage} size="sm" className="bg-primary hover:bg-primary/90 text-black">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
