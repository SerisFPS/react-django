import React from 'react'
import { Button, Image } from 'semantic-ui-react'
import classNames from 'classnames'
import moment from 'moment'
import { ORDER_STATUS } from '../../../../utils/constants'
import './OrderItemAdmin.scss'
import { useOrders } from '../../../../hooks/main'

export function OrderItemAdmin(props) {
  const { order, onRefetchOrders } = props
  const { title, image } = order.product_data

  const { checkDeliveredOrder } = useOrders()

  const onCheckDeliveredOrder = async () => {
    await checkDeliveredOrder(order.id)
    onRefetchOrders()
  }
  return (
    <div
      className={classNames('order-item-admin', {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="order-item-admin__time">
        <span>{moment(order.created_at).format('DD/MM/YYYY -  H:mm:a')}</span>
        {' ; Created '}
        <span>{moment(order.created_at).startOf('seconds').fromNow()}</span>
      </div>
      <div className="order-item-admin__product">
        <Image src={image} />
        <p>{title}</p>
      </div>

      {order.status === ORDER_STATUS.PENDING && (
        <Button primary onClick={onCheckDeliveredOrder}>
          Check as delivered
        </Button>
      )}
    </div>
  )
}
