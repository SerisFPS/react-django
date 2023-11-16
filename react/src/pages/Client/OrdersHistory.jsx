import React, { useEffect, useState } from 'react'
import { useOrders, useTable, usePayment } from '../../hooks/main'
import { useParams } from 'react-router-dom'
import { map, size, forEach } from 'lodash'
import { OrdersHistoryItem, ConfirmModal } from '../../components/main'
import { Button } from 'semantic-ui-react'

export function OrdersHistory() {
  const { tableNumber } = useParams()
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrders()
  const { getTableByNumber } = useTable()
  const [showTypePayment, setShowTypePayment] = useState(false)
  const [idTable, setIdTable] = useState(null)
  const { createPayment } = usePayment()

  const onCreatePayment = async (paymentType) => {
    setShowTypePayment(false)
    let totalPayment = 0

    forEach(orders, (order) => {
      totalPayment += Number(order.product_data.price)
    })
    // console.log(paymentType)
    // console.log(totalPayment)

    const paymentData = {
      table: idTable,
      totalPayment: totalPayment.toFixed(2),
      paymentType,
      statusPayment: 'PENDING',
    }
    const payment = await createPayment(paymentData)

    for await (const order of orders) {
      await addPaymentToOrder(order.id, payment.id)
    }
    window.location.reload()
  }

  useEffect(() => {
    ;(async () => {
      //   console.log(tableNumber)
      const tableData = await getTableByNumber(tableNumber)
      const idTableTemp = tableData[0].id
      setIdTable(idTableTemp)
      // console.log(idTableTemp)

      getOrdersByTable(idTableTemp, '', 'ordering=-status,-created_at')
    })()
  }, [])

  return (
    <div>
      <h2>OrdersHistory</h2>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <>
          {size(orders) > 0 && (
            <Button primary fluid onClick={() => setShowTypePayment(true)}>
              Pay Orders
            </Button>
          )}

          {map(orders, (order) => (
            <OrdersHistoryItem key={order.id} order={order} />
          ))}
        </>
      )}
      <ConfirmModal
        title="Select your payment method: Card/Cash"
        show={showTypePayment}
        onCloseText="Cash"
        onClose={() => onCreatePayment('CASH')}
        onConfirmText="Card"
        onConfirm={() => onCreatePayment('CARD')}
      />
    </div>
  )
}
