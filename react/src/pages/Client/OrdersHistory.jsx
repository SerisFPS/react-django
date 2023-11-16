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
  const [isRequestAccount, setIsRequestAccount] = useState(false)

  useEffect(() => {
    ;(async () => {
      const table = await getTableByNumber(tableNumber)
      const idTableTemp = table[0].id
      setIdTable(idTableTemp)

      getOrdersByTable(idTableTemp, '', 'ordering=-status,-created_at')
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (idTable) {
        const response = await getPaymentByTable(idTable)
        setIsRequestAccount(response)
      }
    })()
  }, [idTable])

  const onCreatePayment = async (paymentType) => {
    setShowTypePayment(false)
    let totalPayment = 0

    forEach(orders, (order) => {
      totalPayment += Number(order.product_data.price)
    })

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

  return (
    <div>
      <h1>Orders History</h1>

      {loading ? (
        <p>Loading ...</p>
      ) : (
        <>
          {size(orders) > 0 && (
            <Button
              primary
              fluid
              onClick={() =>
                size(isRequestAccount) === 0 && setShowTypePayment(true)
              }
            >
              {size(isRequestAccount) > 0 ? 'Check requested' : 'Request check'}
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
