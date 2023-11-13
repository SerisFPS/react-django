import React, { useEffect } from 'react'
import { HeaderPage, TableListAdmin } from '../../components/main'
import { useTable } from '../../hooks/main'
import { Loader } from 'semantic-ui-react'
export function OrdersAdmin() {
  const { loading, tables, getTables } = useTable()

  useEffect(() => {
    getTables()
  }, [])

  return (
    <>
      <HeaderPage title="Restaurant" />
      {loading ? (
        <Loader active inline="centered">
          Loading ...
        </Loader>
      ) : (
        <TableListAdmin tables={tables} />
      )}
    </>
  )
}
