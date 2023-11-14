import React, { useEffect, useState } from 'react'
import { Loader } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import { useOrders, useTable, usePayment } from '../../hooks/main'
import {
  HeaderPage,
  ListOrderAdmin,
  BasicModal,
  AddOrderForm,
  PaymentDetail,
} from '../../components/main'
import { forEach, size } from 'lodash'

export function TableDetailsAdmin() {
  const [showModal, setShowModal] = useState(false)
  const [refetchOrders, setRefetchOrders] = useState(false)
  const [paymentData, setPaymentData] = useState(null)
  const { id } = useParams() // hook used to get table id
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrders()
  const { table, getTable } = useTable()
  const { createPayment, getPaymentByTable } = usePayment()

  // console.log(table)

  const onRefetchOrders = () => setRefetchOrders((prev) => !prev)
  const openCloseModal = () => setShowModal((prev) => !prev)

  const onCreatePayment = async () => {
    const result = window.confirm('Confirm to proceed payment')
    if (result) {
      // sum each product price in totalPayment variable
      let totalPayment = 0
      forEach(orders, (order) => {
        totalPayment += Number(order.product_data.price)
      })

      const resultPaymentMethod = window.confirm(
        'If you confirm, your payment method will be established as a credit card. Cancel if your paying method is cash'
      )
      const paymentData = {
        table: id,
        totalPayment: totalPayment.toFixed(2),
        paymentType: resultPaymentMethod ? 'CARD' : 'CASH',
        statusPayment: 'PENDING',
      }
      const payment = await createPayment(paymentData)
      for await (const order of orders) {
        await addPaymentToOrder(order.id, payment.id)
      }
      onRefetchOrders()
    }
  }

  useEffect(() => {
    getOrdersByTable(id, '', 'ordering=-status,created_at')
  }, [id, refetchOrders])

  useEffect(() => {
    getTable(id)
  }, [id])

  useEffect(() => {
    ;(async () => {
      const response = await getPaymentByTable(id)
      if (size(response) > 0) setPaymentData(response[0])
    })()
  }, [refetchOrders])

  return (
    <>
      {/* if table number exist then... ( used this way because table is not initialized by default xd ) */}
      <HeaderPage
        title={`Table: ${table?.number || ''}`}
        btnTitle={paymentData ? 'Pay' : 'New Order'}
        btnClick={openCloseModal}
        btnTitleTwo={!paymentData ? 'Generate Payment' : null}
        btnClickTwo={onCreatePayment}
      />
      {loading ? (
        <Loader active inline="centered">
          Loading ...
        </Loader>
      ) : (
        <ListOrderAdmin orders={orders} onRefetchOrders={onRefetchOrders} />
      )}

      <BasicModal
        show={showModal}
        onClose={openCloseModal}
        title={paymentData ? 'Payment Details' : 'New Order'}
      >
        {paymentData ? (
          <PaymentDetail
            payment={paymentData}
            orders={orders}
            openCloseModal={openCloseModal}
            onRefetchOrders={onRefetchOrders}
          />
        ) : (
          <AddOrderForm
            idTable={id}
            openCloseModal={openCloseModal}
            onRefetchOrders={onRefetchOrders}
          />
        )}
      </BasicModal>
    </>
  )
}
