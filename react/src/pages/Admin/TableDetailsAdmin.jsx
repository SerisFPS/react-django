import React, { useEffect, useState } from 'react'
import { Loader } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import { useOrders } from '../../hooks/main'
import { HeaderPage, ListOrderAdmin } from '../../components/main'

export function TableDetailsAdmin() {
  const { id } = useParams() // hook used to get table id
  const { loading, orders, getOrdersByTable } = useOrders()
  const [refetchOrders, setRefetchOrders] = useState(false)

  const onRefetchOrders = () => setRefetchOrders((prev) => !prev)

  useEffect(() => {
    getOrdersByTable(id, '', 'ordering=-status,created_at')
  }, [refetchOrders])

  return (
    <>
      <HeaderPage title={`Table: `} />
      {loading ? (
        <Loader active inline="centered">
          Loading ...
        </Loader>
      ) : (
        <ListOrderAdmin orders={orders} onRefetchOrders={onRefetchOrders} />
      )}
    </>
  )
}
