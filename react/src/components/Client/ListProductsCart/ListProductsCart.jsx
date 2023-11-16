import React, { useState, useEffect } from 'react'
import './ListProductsCart.scss'
import { Image, Button, Icon } from 'semantic-ui-react'
import { map, forEach } from 'lodash'
import { useNavigate, useParams } from 'react-router-dom'
import { removeProductCartApi } from '../../../api/cart'

export function ListProductsCart(props) {
  const { products, onReloadCart } = props
  const navigate = useNavigate()

  const removeProduct = (index) => {
    // console.log(index)
    removeProductCartApi(index)
    onReloadCart()
  }

  return (
    <div className="list-products-cart">
      {map(products, (product, index) => (
        <div key={index} className="list-products-cart__product">
          <div>
            <Image src={product.image} avatar />
            <span>{product.title.substring(0, 15)}</span>
          </div>
          <span>{product.price}$</span>
          <Icon name="close" onClick={() => removeProduct(index)} />
        </div>
      ))}
      <Button primary fluid>
        Order
      </Button>
    </div>
  )
}
