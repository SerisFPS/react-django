import { BASE_API } from '../utils/constants'
import React from 'react'

export async function getTablesApi(token) {
  try {
    const url = `${BASE_API}/api/tables/`
    const params = {
      Authorization: `Bearer ${token}`,
    }

    const response = await fetch(url, params)
    const result = await response.json()
    return result
  } catch (error) {
    throw error
  }
}

export async function addTableApi(data, token) {
  try {
    const url = `${BASE_API}/api/tables/`
    const params = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    const response = await fetch(url, params)
    const result = await response.json()
    return result
  } catch (error) {
    throw error
  }
}

export async function updateTableApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/tables/${id}/`
    const params = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    const response = await fetch(url, params)
    const result = await response.json()
    return result
  } catch (error) {
    throw error
  }
}

export async function deleteTableApi(id, token) {
  try {
    const url = `${BASE_API}/api/tables/${id}/`
    const params = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, params)
    const result = await response.json()
    return result
  } catch (error) {
    throw error
  }
}

// this function is different from getTablesAPi. Only gets a specific table id
export async function getTableApi(idTable) {
  try {
    const url = `${BASE_API}/api/tables/${idTable}`
    const response = await fetch(url)
    const result = await response.json()
    return result
  } catch (error) {
    throw error
  }
}

export async function getTableByNumberApi(tableNumber) {
  try {
    const tableFilter = `number=${tableNumber}`

    const url = `${BASE_API}/api/tables/?${tableFilter}`
    const response = await fetch(url)
    const result = await response.json()
    return result
  } catch (error) {
    throw error
  }
}
