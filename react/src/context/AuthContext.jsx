import React, { useState, useEffect, createContext } from 'react'

export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
})

export function AuthProvider(props) {
  const { children } = props
  const valueContext = {
    auth: null,
    login: () => console.log('Start Session'),
    logout: () => console.log('End Session'),
  }
  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  )
}
