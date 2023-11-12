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
