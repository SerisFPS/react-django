import { BASE_API } from '../utils/constants'

import React from 'react'

export async function getOrdersByTableApi(idTable, status = '', ordering = '') {
  try {
    const tableFilter = `table=${idTable}`
    const statusFilter = `status=${status}`
    const closeFilter = 'table=False'

    const url = `${BASE_API}/api/orders/?${tableFilter}&${statusFilter}&${closeFilter}&${ordering}`
    const response = await fetch(url)
    const result = await response.json()
    return result
  } catch (error) {
    throw error
  }
}
