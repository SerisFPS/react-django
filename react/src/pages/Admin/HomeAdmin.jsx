import React from 'react'
import { useAuth } from '../../hooks/main'
export function HomeAdmin() {
  const { logout } = useAuth()
  return (
    <div>
      <h1>HomeAdmin</h1>
      {/* login / logout working */}
      <button onClick={logout}>Close Session</button>
    </div>
  )
}