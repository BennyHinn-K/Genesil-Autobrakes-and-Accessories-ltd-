"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Plus, Upload, CheckCircle, XCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  price: number
  image: string
  rating: number
  category: string
  description: string
  featured: boolean
  inStock: boolean // Added inStock property
  stockQuantity: number // Added stockQuantity property
}

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  message: string
  timestamp: Date
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    image: "",
    rating: 5,
    category: "",
    description: "",
    featured: false,
    inStock: true, // Default to in stock
    stockQuantity: 10, // Default quantity
  })
  const [imagePreview, setImagePreview] = useState<string>("")
  const [editImagePreview, setEditImagePreview] = useState<string>("")
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push("/auth")
      return
    }

    // Load products
    const savedProducts = localStorage.getItem("genesil_products")
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts)
      // Ensure all products have the inStock and stockQuantity properties
      const updatedProducts = parsedProducts.map((product: any) => ({
        ...product,
        inStock: product.inStock !== undefined ? product.inStock : true,
        stockQuantity: product.stockQuantity !== undefined ? product.stockQuantity : 10,
      }))
      setProducts(updatedProducts)
      localStorage.setItem("genesil_products", JSON.stringify(updatedProducts))
    }

    // Load contact submissions
    const savedContacts = localStorage.getItem("genesil_contacts")
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts))
    }
  }, [user, router])

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts)
    localStorage.setItem("genesil_products", JSON.stringify(updatedProducts))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        if (isEdit && editingProduct) {
          setEditingProduct({ ...editingProduct, image: imageUrl })
          setEditImagePreview(imageUrl)
        } else {
          setNewProduct({ ...newProduct, image: imageUrl })
          setImagePreview(imageUrl)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const product: Product = {
      id: Date.now().toString(),
      ...newProduct,
      image: newProduct.image || "/placeholder.svg?height=200&width=200",
    }

    saveProducts([...products, product])
    setNewProduct({
      name: "",
      price: 0,
      image: "",
      rating: 5,
      category: "",
      description: "",
      featured: false,
      inStock: true,
      stockQuantity: 10,
    })
    setImagePreview("")

    toast({
      title: "Product added",
      description: "Product has been added successfully.",
    })
  }

  const handleUpdateProduct = () => {
    if (!editingProduct) return

    const updatedProducts = products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    saveProducts(updatedProducts)
    setEditingProduct(null)
    setEditImagePreview("")

    toast({
      title: "Product updated",
      description: "Product has been updated successfully.",
    })
  }

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter((p) => p.id !== id)
    saveProducts(updatedProducts)

    toast({
      title: "Product deleted",
      description: "Product has been deleted successfully.",
    })
  }

  if (!user?.isAdmin) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">Manage products and view contact submissions</p>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <TabsTrigger value="products" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              Products
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              Contact Submissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Add New Product */}
            <Card className="border-0 premium-shadow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Plus className="h-6 w-6 mr-3 text-yellow-600" />
                  Add New Product
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Name *</label>
                    <Input
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="h-12 rounded-xl border-yellow-200 focus:border-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Price (KSh) *</label>
                    <Input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                      className="h-12 rounded-xl border-yellow-200 focus:border-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Category *</label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                    >
                      <SelectTrigger className="h-12 rounded-xl border-yellow-200 focus:border-yellow-400">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Brake Parts">Brake Parts</SelectItem>
                        <SelectItem value="Engine Parts">Engine Parts</SelectItem>
                        <SelectItem value="Filters">Filters</SelectItem>
                        <SelectItem value="Transmission">Transmission</SelectItem>
                        <SelectItem value="Suspension">Suspension</SelectItem>
                        <SelectItem value="Electrical">Electrical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Rating</label>
                    <Select
                      value={newProduct.rating.toString()}
                      onValueChange={(value) => setNewProduct({ ...newProduct, rating: Number(value) })}
                    >
                      <SelectTrigger className="h-12 rounded-xl border-yellow-200 focus:border-yellow-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Star</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Stock Status *</label>
                    <Select
                      value={newProduct.inStock ? "instock" : "outofstock"}
                      onValueChange={(value) => setNewProduct({ ...newProduct, inStock: value === "instock" })}
                    >
                      <SelectTrigger className="h-12 rounded-xl border-yellow-200 focus:border-yellow-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instock">In Stock</SelectItem>
                        <SelectItem value="outofstock">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Stock Quantity</label>
                    <Input
                      type="number"
                      value={newProduct.stockQuantity}
                      onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: Number(e.target.value) })}
                      className="h-12 rounded-xl border-yellow-200 focus:border-yellow-400"
                      disabled={!newProduct.inStock}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Product Image</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e)}
                          className="h-12 rounded-xl border-yellow-200 focus:border-yellow-400"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-12 px-6 border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-black"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                    {imagePreview && (
                      <div className="mt-4">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-xl border-2 border-yellow-200"
                        />
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Description</label>
                    <Textarea
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="rounded-xl border-yellow-200 focus:border-yellow-400"
                      rows={3}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={newProduct.featured}
                        onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
                        className="w-5 h-5 text-yellow-600 border-yellow-300 rounded focus:ring-yellow-500"
                      />
                      <span className="font-semibold">Featured Product</span>
                    </label>
                  </div>
                </div>
                <Button
                  onClick={handleAddProduct}
                  className="mt-6 premium-button text-black font-semibold px-8 py-3 rounded-xl"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Product
                </Button>
              </CardContent>
            </Card>

            {/* Products List */}
            <Card className="border-0 premium-shadow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Existing Products ({products.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-6 border border-yellow-200 rounded-2xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm card-hover"
                    >
                      <div className="flex items-center space-x-6">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-xl border-2 border-yellow-200"
                        />
                        <div>
                          <h3 className="font-bold text-lg">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                          <p className="text-lg font-semibold text-yellow-600">KSh {product.price.toLocaleString()}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {product.featured && <Badge className="bg-yellow-400 text-black">Featured</Badge>}
                            {product.inStock ? (
                              <Badge className="bg-green-500 text-white flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1" /> In Stock ({product.stockQuantity || 0})
                              </Badge>
                            ) : (
                              <Badge className="bg-red-500 text-white flex items-center">
                                <XCircle className="h-3 w-3 mr-1" /> Out of Stock
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingProduct(product)}
                          className="border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-black"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="border-red-400 text-red-600 hover:bg-red-400 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Edit Product Modal */}
            {editingProduct && (
              <Card className="border-0 premium-shadow bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Edit Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Name</label>
                      <Input
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="h-12 rounded-xl border-yellow-200 focus:border-yellow-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Price (KSh)</label>
                      <Input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                        className="h-12 rounded-xl border-yellow-200 focus:border-yellow-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Category</label>
                      <Select
                        value={editingProduct.category}
                        onValueChange={(value) => setEditingProduct({ ...editingProduct, category: value })}
                      >
                        <SelectTrigger className="h-12 rounded-xl border-yellow-200 focus:border-yellow-400">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Brake Parts">Brake Parts</SelectItem>
                          <SelectItem value="Engine Parts">Engine Parts</SelectItem>
                          <SelectItem value="Filters">Filters</SelectItem>
                          <SelectItem value="Transmission">Transmission</SelectItem>
                          <SelectItem value="Suspension">Suspension</SelectItem>
                          <SelectItem value="Electrical">Electrical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Rating</label>
                      <Select
                        value={editingProduct.rating.toString()}
                        onValueChange={(value) => setEditingProduct({ ...editingProduct, rating: Number(value) })}
                      >
                        <SelectTrigger className="h-12 rounded-xl border-yellow-200 focus:border-yellow-400">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Star</SelectItem>
                          <SelectItem value="2">2 Stars</SelectItem>
                          <SelectItem value="3">3 Stars</SelectItem>
                          <SelectItem value="4">4 Stars</SelectItem>
                          <SelectItem value="5">5 Stars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Stock Status</label>
                      <Select
                        value={editingProduct.inStock ? "instock" : "outofstock"}
                        onValueChange={(value) =>
                          setEditingProduct({ ...editingProduct, inStock: value === "instock" })
                        }
                      >
                        <SelectTrigger className="h-12 rounded-xl border-yellow-200 focus:border-yellow-400">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instock">In Stock</SelectItem>
                          <SelectItem value="outofstock">Out of Stock</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Stock Quantity</label>
                      <Input
                        type="number"
                        value={editingProduct.stockQuantity || 0}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, stockQuantity: Number(e.target.value) })
                        }
                        className="h-12 rounded-xl border-yellow-200 focus:border-yellow-400"
                        disabled={!editingProduct.inStock}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2">Product Image</label>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, true)}
                            className="h-12 rounded-xl border-yellow-200 focus:border-yellow-400"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-12 px-6 border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-black"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                      {(editImagePreview || editingProduct.image) && (
                        <div className="mt-4">
                          <img
                            src={editImagePreview || editingProduct.image}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-xl border-2 border-yellow-200"
                          />
                        </div>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2">Description</label>
                      <Textarea
                        value={editingProduct.description}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        className="rounded-xl border-yellow-200 focus:border-yellow-400"
                        rows={3}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={editingProduct.featured}
                          onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                          className="w-5 h-5 text-yellow-600 border-yellow-300 rounded focus:ring-yellow-500"
                        />
                        <span className="font-semibold">Featured Product</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-6">
                    <Button
                      onClick={handleUpdateProduct}
                      className="premium-button text-black font-semibold px-8 py-3 rounded-xl"
                    >
                      Update Product
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditingProduct(null)}
                      className="border-gray-400 text-gray-600 hover:bg-gray-100 px-8 py-3 rounded-xl"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="contacts">
            <Card className="border-0 premium-shadow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Submissions ({contacts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {contacts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No contact submissions yet.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="p-6 border border-yellow-200 rounded-2xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-bold text-lg">{contact.name}</h3>
                          <span className="text-sm text-muted-foreground bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full">
                            {new Date(contact.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <p className="text-sm">
                            <span className="font-semibold">Email:</span> {contact.email}
                          </p>
                          {contact.phone && (
                            <p className="text-sm">
                              <span className="font-semibold">Phone:</span> {contact.phone}
                            </p>
                          )}
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                          <p className="text-sm font-semibold mb-2">Message:</p>
                          <p className="text-sm leading-relaxed">{contact.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
