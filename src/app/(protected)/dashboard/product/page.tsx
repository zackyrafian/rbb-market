"use client"
import useSWR from "swr"
import AddProductForm from "./_components/add-form-product"
import { API } from "@/lib/api"
import { api } from "@/lib/r"
import { useState } from "react"
import { FiEdit2, FiTrash2, FiSearch } from "react-icons/fi"

export default function DashboardProductPage() {
  const { data: products, error, isLoading, mutate } = useSWR(API.PRODUCT, api.get)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products
    ? products.filter((product: any) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )

  if (error)
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
        Error fetching products. Please try again later.
      </div>
    )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <AddProductForm onSuccess={() => mutate()} />

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Product List</h2>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} onRefresh={() => mutate()} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ProductCard({ product, onRefresh }: { product: any; onRefresh: () => void }) {
  const imageId = Math.floor(Math.random() * 1000)
  const imageUrl = `/placeholder.svg?height=200&width=300&text=Product+${product.id}`

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`${API.PRODUCT}/${product.id}`)
        onRefresh()
      } catch (error) {
        console.error("Error deleting product:", error)
      }
    }
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="relative aspect-video bg-gray-100">
        <img src={imageUrl || "/placeholder.svg"} alt={product.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 flex space-x-1">
          <button className="p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
            <FiEdit2 className="w-4 h-4 text-gray-600" />
          </button>
          <button
            className="p-1.5 bg-white rounded-full shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
            onClick={handleDelete}
          >
            <FiTrash2 className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 truncate">{product.title}</h3>
        <div className="flex justify-between items-center">
          <p className="text-gray-700 font-bold">${Number(product.price).toLocaleString()}</p>
          <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full">In Stock</span>
        </div>
      </div>
    </div>
  )
}
