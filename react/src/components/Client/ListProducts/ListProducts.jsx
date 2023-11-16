import React from 'react'
import { Image, Button, Icon } from 'semantic-ui-react'
import { map } from 'lodash'
import './ListProducts.scss'
import { addProductCart } from '../../../api/cart'
import { toast } from 'react-toastify'

export function ListProducts(props) {
  const { products } = props

  const addCart = (product) => {
    // console.log(`add cart product ---> ${product.title}`)
    addProductCart(product.id)
    toast.success(`${product.title} added to cart`)
  }
  return (
    <div className="list-products-client">
      {map(products, (product) => (
        <div key={product.id} className="list-products-client__product">
          <div>
            <Image src={product.image} />
            <span>{product.title}</span>
          </div>
          <Button primary icon onClick={() => addCart(product)}>
            <Icon name="add"></Icon>
          </Button>
        </div>
      ))}
    </div>
  )
}
