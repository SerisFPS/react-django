import { useState } from 'react'
import { getProductsApi } from '../api/products'

export function useProducts() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [products, setProducts] = useState(null)

  const getProducts = async () => {
    try {
      setLoading(true)
      const response = await getProductsApi()
      setLoading(false)
      setProducts(response)
    } catch (error) {
      throw error
    }
  }

  return {
    loading,
    error,
    products,
    getProducts,
  }
}
