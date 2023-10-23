import React, { useState, useEffect, createContext } from 'react'
import { setToken, getToken, removeToken } from '../api/token'
import { useUser } from '../hooks/main'

export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
})

export function AuthProvider(props) {
  const { children } = props
  const [auth, setAuth] = useState(undefined)
  const { getMe } = useUser()

  useEffect(() => {
    ;(async () => {
      const token = getToken()
      if (token) {
        const me = await getMe(token)
        setAuth({ token, me }) // if you remove {} from setAuth isn't going to save token and me as objects in auth
        console.log(auth)
      } else {
        setAuth(null)
      }
    })()
  }, [])

  const login = async (token) => {
    setToken(token)
    const me = await getMe(token)
    setAuth({ token, me })
  }

  const logout = () => {
    removeToken()
    setAuth(null)
  }

  // pass functions to context provider
  const valueContext = {
    auth,
    login,
    logout,
  }

  // fix loading login page before auth
  if (auth === undefined) return null
  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  )
}
