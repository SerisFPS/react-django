import React, { useState, useEffect } from 'react'
import './ListProductsCart.scss'
import { Image, Button, Icon } from 'semantic-ui-react'
import { map, forEach } from 'lodash'
import { useNavigate, useParams } from 'react-router-dom'
import { removeProductCartApi, cleanProductCartApi } from '../../../api/cart'
import { number } from 'yup'
import { useOrders, useTable } from '../../../hooks/main'

export function ListProductsCart(props) {
  const { products, onReloadCart } = props
  const { tableNumber } = useParams()
  const { addOrderToTable } = useOrders()
  const { getTableByNumber } = useTable()
  const navigate = useNavigate()

  const [total, setTotal] = useState(0)

  useEffect(() => {
    let totalTemp = 0
    forEach(products, (product) => {
      totalTemp += Number(product.price)
    })
    setTotal(totalTemp.toFixed(2))
  }, [products])

  const removeProduct = (index) => {
    // console.log(index)
    removeProductCartApi(index)
    onReloadCart()
  }

  const createOrder = async () => {
    const tableData = await getTableByNumber(tableNumber)
    const idTable = tableData[0].id
    console.log(tableData)
    console.log(idTable)

    for await (const product of products) {
      await addOrderToTable(idTable, product.id)
    }
    cleanProductCartApi()
    navigate(`/client/${idTable}/orders`)
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
      <Button primary fluid onClick={createOrder}>
        Order (Total {total})
      </Button>
    </div>
  )
}
