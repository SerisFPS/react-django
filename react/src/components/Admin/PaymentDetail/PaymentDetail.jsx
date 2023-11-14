import React from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import { usePayment, useOrders } from '../../../hooks/main'
import './PaymentDetail.scss'

export function PaymentDetail(props) {
  const { payment, orders, openCloseModal, onRefetchOrders } = props
  const { closePayment } = usePayment()
  const { closeOrder } = useOrders()
  const getIconPayment = (key) => {
    if (key === 'CARD') return 'credit card outline'
    if (key === 'CASH') return 'money bill alternate outline'
    return null
  }

  const onClosePayment = async () => {
    const result = window.confirm('leave table?')
    if (result) {
      await closePayment(payment.id)
      for await (const order of orders) {
        await closeOrder(order.id)
      }
      onRefetchOrders()
      openCloseModal()
    }
  }
  return (
    <div className="payment-detail">
      <Table striped>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Table:</Table.Cell>
            <Table.Cell>{payment.table_data.number}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Total</Table.Cell>
            <Table.Cell>{payment.totalPayment} $</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Pay method</Table.Cell>
            <Table.Cell>
              <Icon name={getIconPayment(payment.paymentType)}></Icon>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Button primary fluid onClick={onClosePayment}>
        Pay
      </Button>
    </div>
  )
}
