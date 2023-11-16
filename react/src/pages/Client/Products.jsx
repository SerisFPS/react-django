import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProducts } from '../../hooks/main'
import { ListProducts } from '../../components/main'

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
      {loading ? <p>Loading ...</p> : <ListProducts products={products} />}
    </div>
  )
}
