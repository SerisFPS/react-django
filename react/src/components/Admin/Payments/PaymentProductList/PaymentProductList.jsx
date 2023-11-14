import react, { useEffect, useState } from 'react'
import './PaymentProductList.scss'
import { useOrders } from '../../../../hooks/main'
import { map } from 'lodash'
import { Image } from 'semantic-ui-react'

export function PaymentProductList(props) {
  const { payment } = props
  const [orders, setOrders] = useState(undefined)
  const { getOrderByPayment } = useOrders()

  useEffect(() => {
    ;(async () => {
      const response = await getOrderByPayment(payment.id)
      console.log(response)
      setOrders(response)
    })()
  }, [])

  return (
    <div className="payment-product-list">
      {map(orders, (order) => (
        <div className="payment-product-list__product" key={order.id}>
          <div>
            <Image
              src={order.product_data.image}
              avatar
              //   circular={false}
              size="tiny"
            />
            <span>{order.product_data.title}</span>
          </div>
          <span>{order.product_data.price} $</span>
        </div>
      ))}
    </div>
  )
}
