import React, { useEffect } from 'react'
import { HeaderPage, TablePayments } from '../../components/main'
import { usePayment } from '../../hooks/main'
import { Loader } from 'semantic-ui-react'

export function PaymentsHistory() {
  const { refetch, payments, getPayments } = usePayment()
  useEffect(() => {
    getPayments()
  }, [])

  console.log(payments)

  return (
    <>
      <HeaderPage title="Pay History" />
      {refetch ? (
        <Loader active inline="centered">
          Loading ...
        </Loader>
      ) : (
        <TablePayments payments={payments} />
      )}
    </>
  )
}
