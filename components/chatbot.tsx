"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm here to help you find the right auto parts. What can I assist you with today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simple bot responses
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("brake") || lowerInput.includes("brakes")) {
      return "We have a wide selection of brake parts including brake pads, rotors, and brake fluid for Toyota, Nissan, Subaru, and Mitsubishi. What specific brake part are you looking for?"
    }

    if (lowerInput.includes("toyota")) {
      return "We stock genuine Toyota parts including filters, brake components, engine parts, and more. Which Toyota model do you have?"
    }

    if (lowerInput.includes("price") || lowerInput.includes("cost")) {
      return "Our prices are competitive and we offer genuine parts only. You can browse our catalogue to see current prices, or tell me what specific part you need for a quote."
    }

    if (lowerInput.includes("delivery") || lowerInput.includes("shipping")) {
      return "We offer fast delivery across Nairobi and Kenya. Free delivery on orders over KSh 5,000. Delivery usually takes 1-2 business days within Nairobi."
    }

    if (lowerInput.includes("location") || lowerInput.includes("where")) {
      return "We're located on Kirinyaga Road, Nairobi - the heart of Kenya's automotive scene. You can visit us or call +254 722 683 434."
    }

    return "I can help you find auto parts for Toyota, Nissan, Subaru, Mitsubishi and European brands. You can also ask about prices, delivery, or our location. What would you like to know?"
  }

  return (
    <>
      {/* Chat button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full bg-black text-yellow-400 hover:bg-gray-800 shadow-lg z-50 ${isOpen ? "hidden" : "flex"}`}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 z-50 shadow-2xl border-2 border-yellow-400">
          <CardHeader className="bg-black text-yellow-400 p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Genesil Assistant</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-yellow-400 hover:bg-gray-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isBot
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        : "bg-yellow-400 text-black"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about auto parts..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-yellow-400 text-black hover:bg-yellow-500"
                >
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
