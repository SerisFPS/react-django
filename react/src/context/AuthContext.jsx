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
        setAuth(token, me)
        console.log(me)
      } else {
        setAuth(null)
      }
      // console.log(`token ---> ${token}`)
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
  // is commented because gives me an error ( white screen ) when isn't logged. Fix it
  if (auth === undefined) return null
  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  )
}
