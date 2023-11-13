import React from 'react'
import { map } from 'lodash'
import './ListOrderAdmin.scss'

export function ListOrderAdmin(props) {
  const { orders } = props
  console.log('ListOrderAdmin Component Call')
  console.log(orders)
  return (
    <div className="list-orders-admin">
      {map(
        orders,
        (order) => (
          console.log('ListOrderAdmin Component Map'),
          (<h2 key={order.id}>Order...</h2>)
        )
      )}
    </div>
  )
}
