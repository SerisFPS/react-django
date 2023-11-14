import React, { useState } from 'react'
import {
  createPaymentApi,
  getPaymentByTableApi,
  closePaymentApi,
  getPaymentsApi,
} from '../api/payment'

export function usePayment() {
  const [refetch, setRefetch] = useState(true)
  const [payments, setPayments] = useState(null)
  const [error, setError] = useState(null)

  const createPayment = async (paymentData) => {
    try {
      return await createPaymentApi(paymentData)
    } catch (error) {
      setError(error)
    }
  }

  const getPaymentByTable = async (idTable) => {
    try {
      return await getPaymentByTableApi(idTable)
    } catch (error) {
      setError(error)
    }
  }

  const closePayment = async (idPayment) => {
    try {
      await closePaymentApi(idPayment)
    } catch (error) {
      setError(error)
    }
  }
  const getPayments = async () => {
    try {
      setRefetch(true)
      const response = await getPaymentsApi()
      setRefetch(false)
      setPayments(response)
    } catch (error) {
      setRefetch(false)
      setError(error)
    }
  }

  return {
    error,
    payments,
    refetch,
    createPayment,
    getPaymentByTable,
    closePayment,
    getPayments,
  }
}
