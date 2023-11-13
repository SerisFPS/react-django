import React from 'react'
import { map } from 'lodash'
import { OrderItemAdmin } from '../OrderItemAdmin/main'
import './ListOrderAdmin.scss'

export function ListOrderAdmin(props) {
  const { orders } = props
  //   console.log(orders)
  return (
    <div className="list-orders-admin">
      {map(orders, (order) => (
        //   console.log('ListOrderAdmin Component Map'),
        <OrderItemAdmin key={order.id} order={order} />
      ))}
    </div>
  )
}
