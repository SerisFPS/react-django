import React, { useEffect } from 'react'
import { Loader } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import { useOrders } from '../../hooks/main'
import { HeaderPage, ListOrderAdmin } from '../../components/main'

export function TableDetailsAdmin() {
  const { id } = useParams() // hook used to get table id
  const { loading, orders, getOrdersByTable } = useOrders()

  useEffect(() => {
    getOrdersByTable(id)
  }, [])

  console.log(orders)
  return (
    <>
      <HeaderPage title={`Table: `} />
      {loading ? (
        <Loader active inline="centered">
          Loading ...
        </Loader>
      ) : (
        // <h2>list</h2>
        (console.log('Else'), (<ListOrderAdmin orders={orders} />))
      )}
    </>
  )
}
