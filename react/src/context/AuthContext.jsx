import React, { useState, useEffect, createContext } from 'react'
import { setToken } from '../api/token'

export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
})

export function AuthProvider(props) {
  const { children } = props
  const login = async (token) => {
    setToken(token)
  }
  const valueContext = {
    auth: null,
    login,
    logout: () => console.log('End Session'),
  }
  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  )
}
