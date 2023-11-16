import React, { useState, useEffect } from 'react'
import { useProducts } from '../../hooks/main'
import { getProductsCart } from '../../api/cart'

export function Cart() {
  const { getProductById } = useProducts()

  useEffect(() => {
    ;(async () => {
      const idProductCart = getProductsCart()
      //   console.log(idProductCart)

      const productsArray = []
      for await (const idProduct of idProductCart) {
        const response = await getProductById(idProduct)
      }
    })()
  }, [])

  return (
    <div>
      <h1>Cart</h1>
    </div>
  )
}
