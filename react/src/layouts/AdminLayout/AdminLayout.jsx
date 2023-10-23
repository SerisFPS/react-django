import React from 'react'
import './AdminLayout.scss'
import { LoginAdmin } from '../../pages/Admin/LoginAdmin/main'
import { useAuth } from '../../hooks/main'

export function AdminLayout(props) {
  const { children } = props
  const { auth } = useAuth()

  if (!auth) return <LoginAdmin />

  return (
    <div>
      <p>Admin Layout File</p>
      {children}
    </div>
  )
}
