import { React, useState } from 'react'
import { getMeApi } from '../api/user'
export function useUser(params) {
  const getMe = async (token) => {
    try {
      const response = await getMeApi(token)
      return response
    } catch (error) {
      throw error
    }
  }
  return {
    getMe,
  }
}
