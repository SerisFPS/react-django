import React, { useEffect, useState } from 'react'
import { Loader } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import { useOrders, useTable } from '../../hooks/main'
import {
  HeaderPage,
  ListOrderAdmin,
  BasicModal,
  AddOrderForm,
} from '../../components/main'

export function TableDetailsAdmin() {
  const { id } = useParams() // hook used to get table id
  const { loading, orders, getOrdersByTable } = useOrders()
  const [refetchOrders, setRefetchOrders] = useState(false)
  const { table, getTable } = useTable()
  const [showModal, setShowModal] = useState(false)

  // console.log(table)

  const onRefetchOrders = () => setRefetchOrders((prev) => !prev)
  const openCloseModal = () => setShowModal((prev) => !prev)

  useEffect(() => {
    getOrdersByTable(id, '', 'ordering=-status,created_at')
  }, [id, refetchOrders])

  useEffect(() => {
    getTable(id)
  }, [id])

  return (
    <>
      {/* if table number exist then... ( used this way because table is not initialized by default xd ) */}
      <HeaderPage
        title={`Table: ${table?.number || ''}`}
        btnTitle="new order"
        btnClick={openCloseModal}
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
        title="New Order Form"
      >
        <AddOrderForm idTable={id} openCloseModal={openCloseModal} />
      </BasicModal>
    </>
  )
}
