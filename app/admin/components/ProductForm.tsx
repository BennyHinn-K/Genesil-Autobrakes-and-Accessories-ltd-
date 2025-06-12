"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  rating: number
  reviews: number
  category: string
  brand: string
  inStock: boolean
  description: string
}

interface ProductFormProps {
  product?: Product | null
  onSave: (product: Omit<Product, "id">) => void
  onCancel: () => void
}

const categories = ["Brake Discs", "Brake Pads", "Brake Calipers", "Fluids", "Accessories"]
const brands = ["Genesil", "Genesil Pro", "Genesil Elite", "Genesil Sport"]

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    originalPrice: product?.originalPrice || 0,
    image: product?.image || "/placeholder.svg?height=300&width=300",
    rating: product?.rating || 4.5,
    reviews: product?.reviews || 0,
    category: product?.category || categories[0],
    brand: product?.brand || brands[0],
    inStock: product?.inStock ?? true,
    description: product?.description || "",
  })
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]:
        type === "number"
          ? Number.parseFloat(value) || 0
          : type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)

      // In a real application, this would be an API call to upload the image
      // For this demo, we'll simulate the upload with a timeout
      const reader = new FileReader()
      reader.onload = (e) => {
        // Simulate API delay
        setTimeout(() => {
          setFormData({
            ...formData,
            image: e.target?.result as string,
          })
          setIsUploading(false)
          toast({
            title: "Image Uploaded Successfully",
            description: `File "${file.name}" has been uploaded.`,
          })
        }, 1500)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onCancel} className="mr-4 text-black hover:text-yellow-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-black">{product ? "Edit Product" : "Add New Product"}</h1>
            <p className="text-gray-600">
              {product ? "Update product information" : "Add a new product to your catalog"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Information */}
            <div className="space-y-6">
              <Card className="border-l-4 border-yellow-400">
                <CardHeader>
                  <CardTitle className="text-black">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Enter product description"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                      <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      >
                        {brands.map((brand) => (
                          <option key={brand} value={brand}>
                            {brand}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-yellow-400">
                <CardHeader>
                  <CardTitle className="text-black">Pricing (KES)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Price</label>
                      <input
                        type="number"
                        name="price"
                        required
                        min="0"
                        step="1"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
                      <input
                        type="number"
                        name="originalPrice"
                        min="0"
                        step="1"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-yellow-400">
                <CardHeader>
                  <CardTitle className="text-black">Product Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <input
                        type="number"
                        name="rating"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number of Reviews</label>
                      <input
                        type="number"
                        name="reviews"
                        min="0"
                        value={formData.reviews}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="inStock"
                      id="inStock"
                      checked={formData.inStock}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label htmlFor="inStock" className="ml-2 block text-sm text-gray-900">
                      In Stock
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Image */}
            <div>
              <Card className="border-l-4 border-yellow-400">
                <CardHeader>
                  <CardTitle className="text-black">Product Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {formData.image ? (
                      <img
                        src={formData.image || "/placeholder.svg"}
                        alt="Product preview"
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg mb-4">
                        <ImageIcon className="h-16 w-16 text-gray-400 mb-2" />
                        <p className="text-gray-500">No image selected</p>
                      </div>
                    )}
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        ref={fileInputRef}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={triggerFileInput}
                        disabled={isUploading}
                        className="mb-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                      >
                        {isUploading ? (
                          <>
                            <div className="animate-spin h-4 w-4 mr-2 border-2 border-yellow-600 border-t-transparent rounded-full"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Image
                          </>
                        )}
                      </Button>
                      <p className="text-sm text-gray-600">Upload a high-quality image of your product</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL (Alternative)</label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 flex gap-4">
                <Button type="submit" className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  {product ? "Update Product" : "Add Product"}
                </Button>
                <Button type="button" variant="outline" onClick={onCancel} className="flex-1 border-gray-300">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
