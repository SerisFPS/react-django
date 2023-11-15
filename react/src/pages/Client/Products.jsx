import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProducts } from '../../hooks/main'

export function Products() {
  const { tableNumber, idCategory } = useParams()
  const { loading, products, getProductsByCategory } = useProducts()

  useEffect(() => {
    getProductsByCategory(idCategory)
  }, [idCategory])
  // console.log(products)

  return (
    <div>
      <Link to={`/client/${tableNumber}`}>Return to Categories</Link>
      <p>Table: {tableNumber}</p>
      <p>Category: {idCategory}</p>
    </div>
  )
}
