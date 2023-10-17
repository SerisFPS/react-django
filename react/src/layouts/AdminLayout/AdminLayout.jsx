import React from 'react'
import './AdminLayout.scss'
import { LoginAdmin } from '../../pages/Admin/LoginAdmin/main'

export function AdminLayout(props) {
  const { children } = props
  const auth = null

  if (!auth) return <LoginAdmin />

  return (
    <div>
      <p>Admin Layout File</p>
      {children}
    </div>
  )
}
