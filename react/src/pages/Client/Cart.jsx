import React, { useState, useEffect } from 'react'
import { useProducts } from '../../hooks/main'
import { getProductsCart } from '../../api/cart'
import { map, size } from 'lodash'
import { Link, useParams } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { ListProductsCart } from '../../components/main'

export function Cart() {
  const { getProductById } = useProducts()
  const [products, setProducts] = useState(null)
  const { tableNumber } = useParams()

  const [reloadCart, setReloadCart] = useState(false)
  const onReloadCart = () => setReloadCart((prev) => !prev) // switchezzzzzz w-w

  useEffect(() => {
    ;(async () => {
      const idProductCart = getProductsCart()
      //   console.log(idProductCart)
      const productsArray = []
      for await (const idProduct of idProductCart) {
        const response = await getProductById(idProduct)
        // console.log(response)
        productsArray.push(response)
      }
      setProducts(productsArray)
      //   console.log(products)
    })()
  }, [reloadCart])

  return (
    <div>
      <h1>Cart</h1>
      {!products ? (
        <p>Loading ...</p>
      ) : size(products) < 1 ? (
        // else if moment u-u
        // <p>Your cart is empty</p>
        <div style={{ textAlign: 'center' }}>
          <p>Your cart is empty</p>
          <Link to={`/client/${tableNumber}/orders`}>
            <Button primary>Check Orders</Button>
          </Link>
        </div>
      ) : (
        <ListProductsCart products={products} onReloadCart={onReloadCart} />
      )}
    </div>
  )
}
