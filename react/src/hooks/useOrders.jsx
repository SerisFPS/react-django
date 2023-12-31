import React, { useState } from 'react'
import {
  getOrdersByTableApi,
  checkDeliveredOrderApi,
  addPaymentToOrderApi,
  closeOrderApi,
  getOrderByPaymentApi,
  addOrderToTableApi,
} from '../api/orders'

export function useOrders() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [orders, setOrders] = useState(null)

  const getOrdersByTable = async (idTable, status, ordering) => {
    try {
      setLoading(true)
      const response = await getOrdersByTableApi(idTable, status, ordering)
      setLoading(false)
      setOrders(response)
    } catch (error) {
      setError(error)
    }
  }

  const checkDeliveredOrder = async (idOrder) => {
    try {
      await checkDeliveredOrderApi(idOrder)
    } catch (error) {
      setError(error)
    }
  }

  const addOrderToTable = async (idTable, idProduct) => {
    try {
      await addOrderToTableApi(idTable, idProduct)
    } catch (error) {
      setError(error)
    }
  }

  const addPaymentToOrder = async (idOrder, idPayment) => {
    try {
      await addPaymentToOrderApi(idOrder, idPayment)
    } catch (error) {
      setError(error)
    }
  }

  const closeOrder = async (idOrder) => {
    try {
      await closeOrderApi(idOrder)
    } catch (error) {
      setError(error)
    }
  }

  const getOrderByPayment = async (idPayment) => {
    try {
      return await getOrderByPaymentApi(idPayment)
    } catch (error) {
      setError(error)
    }
  }

  return {
    loading,
    error,
    orders,
    getOrdersByTable,
    checkDeliveredOrder,
    addPaymentToOrder,
    closeOrder,
    getOrderByPayment,
    addOrderToTable,
  }
}
