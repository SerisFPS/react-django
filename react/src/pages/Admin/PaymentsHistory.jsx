import React, { useEffect } from 'react'
import { HeaderPage } from '../../components/main'
import { usePayment } from '../../hooks/main'

export function PaymentsHistory() {
  const { refetch, payments, getPayments } = usePayment()
  useEffect
  return (
    <>
      <HeaderPage title="Pay History" />
    </>
  )
}
