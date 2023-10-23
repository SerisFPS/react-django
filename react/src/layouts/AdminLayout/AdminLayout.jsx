import React from 'react'
import './AdminLayout.scss'
import { LoginAdmin } from '../../pages/Admin/LoginAdmin/main'
import { useAuth } from '../../hooks/main'
import { TopMenu } from '../../components/main'
export function AdminLayout(props) {
  const { children } = props
  const { auth } = useAuth()

  if (!auth) return <LoginAdmin />

  return (
    <div className="admin-layout">
      <div className="admin-layout__menu">
        <TopMenu />
      </div>
      <div className="admin-layout__main-content">{children}</div>
    </div>
  )
}
