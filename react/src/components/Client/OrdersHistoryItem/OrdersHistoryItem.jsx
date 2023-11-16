import React from 'react'
import './OrdersHistoryItem.scss'
import { Image } from 'semantic-ui-react'
import classNames from 'classnames'
import moment from 'moment'
import { ORDER_STATUS } from '../../../utils/constants'

export function OrdersHistoryItem(props) {
  const { order } = props
  const { title, image } = order.product_data

  return (
    <div
      className={classNames('orders-history-item', {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="orders-history-item__time">
        <span>
          Ordered {moment(order.created_at).startOf('second').fromNow()}
        </span>
      </div>
      <div className="orders-history-item__product">
        <Image src={image} />
        <p>{title}</p>
      </div>
      {order.status === ORDER_STATUS.PENDING ? (
        <span>In Process</span>
      ) : (
        <span>Delivered</span>
      )}
    </div>
  )
}
