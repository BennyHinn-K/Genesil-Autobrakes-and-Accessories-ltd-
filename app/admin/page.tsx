"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import ProductForm from "./components/ProductForm"
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

export default function AdminPage() {
  const { isAdmin, user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Sample products data
  const sampleProducts: Product[] = [
    {
      id: 1,
      name: "Premium Brake Disc Set",
      price: 38999,
      originalPrice: 45499,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 124,
      category: "Brake Discs",
      brand: "Genesil Pro",
      inStock: true,
      description: "High-performance ventilated brake discs for superior stopping power",
    },
    {
      id: 2,
      name: "High-Performance Brake Pads",
      price: 11699,
      originalPrice: 14299,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 89,
      category: "Brake Pads",
      brand: "Genesil Pro",
      inStock: true,
      description: "Ceramic brake pads with excellent heat dissipation",
    },
    {
      id: 3,
      name: "Complete Brake Caliper Kit",
      price: 25999,
      originalPrice: 32499,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 156,
      category: "Brake Calipers",
      brand: "Genesil Elite",
      inStock: true,
      description: "Complete caliper assembly with mounting hardware",
    },
    {
      id: 4,
      name: "Brake Fluid DOT 4",
      price: 3249,
      originalPrice: 3899,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviews: 78,
      category: "Fluids",
      brand: "Genesil",
      inStock: true,
      description: "High-quality DOT 4 brake fluid for all vehicle types",
    },
  ]

  useEffect(() => {
    if (!isAdmin) {
      router.push("/auth")
      return
    }
    setProducts(sampleProducts)
  }, [isAdmin, router])

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You need admin privileges to access this page.</p>
          <Button onClick={() => router.push("/auth")} className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Login as Admin
          </Button>
        </div>
      </div>
    )
  }

  const handleAddProduct = (productData: Omit<Product, "id">) => {
    const newProduct = {
      ...productData,
      id: Math.max(...products.map((p) => p.id)) + 1,
    }
    setProducts([...products, newProduct])
    setShowForm(false)
    toast({
      title: "Product Added!",
      description: "New product has been added successfully.",
    })
  }

  const handleEditProduct = (productData: Omit<Product, "id">) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p)))
      setEditingProduct(null)
      setShowForm(false)
      toast({
        title: "Product Updated!",
        description: "Product has been updated successfully.",
      })
    }
  }

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id))
      toast({
        title: "Product Deleted!",
        description: "Product has been removed from the catalog.",
      })
    }
  }

  const toggleStock = (id: number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p)))
    toast({
      title: "Stock Status Updated!",
      description: "Product stock status has been changed.",
    })
  }

  if (showForm) {
    return (
      <ProductForm
        product={editingProduct}
        onSave={editingProduct ? handleEditProduct : handleAddProduct}
        onCancel={() => {
          setShowForm(false)
          setEditingProduct(null)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => router.push("/")} className="mr-4 text-black hover:text-yellow-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}! Manage your product catalog</p>
            </div>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow border-l-4 border-yellow-400">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Badge variant={product.inStock ? "default" : "secondary"} className="bg-yellow-500 text-black">
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                      {product.category}
                    </Badge>
                    <span className="text-sm text-gray-500">{product.brand}</span>
                  </div>

                  <h3 className="font-semibold text-lg mb-2 text-black">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-black">KES {product.price.toLocaleString()}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          KES {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      ⭐ {product.rating} ({product.reviews})
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingProduct(product)
                        setShowForm(true)
                      }}
                      className="flex-1 border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStock(product.id)}
                      className="border-blue-500 text-blue-600 hover:bg-blue-50"
                    >
                      {product.inStock ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="border-red-500 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">No products found</p>
            <Button onClick={() => setShowForm(true)} className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Product
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
