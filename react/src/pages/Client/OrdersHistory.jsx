import React, { useEffect, useState } from 'react'
import { useOrders, useTable, usePayment } from '../../hooks/main'
import { useParams } from 'react-router-dom'
import { map, size, forEach } from 'lodash'
import { OrdersHistoryItem, ConfirmModal } from '../../components/main'
import { Button } from 'semantic-ui-react'
// import { getPaymentByTableApi } from '../../api/payment'

export function OrdersHistory() {
  const { tableNumber } = useParams()
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrders()
  const { getTableByNumber } = useTable()
  const [showTypePayment, setShowTypePayment] = useState(false)
  const [idTable, setIdTable] = useState(null)
  const { createPayment, getPaymentByTable } = usePayment()

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

  // get table number
  useEffect(() => {
    ;(async () => {
      //   console.log(tableNumber)
      const table = await getTableByNumber(tableNumber)
      const idTableTemp = table[0].id
      if (table) {
        setIdTable(idTableTemp)
        console.log('from if')
      }

      getOrdersByTable(idTableTemp, '', 'ordering=-status,-created_at')
    })()
  }, [])

  // get payments
  useEffect(() => {
    ;(async () => {
      if (idTable) {
        const response = await getPaymentByTable(idTable)
        console.log(response)
      }
    })()
  }, [idTable])

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
