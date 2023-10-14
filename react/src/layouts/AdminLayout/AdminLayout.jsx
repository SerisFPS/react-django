import React from 'react'
import './AdminLayout.scss'

export function AdminLayout(props) {
  const { children } = props
  return (
    <div>
      <p>Admin Layout File</p>
      {children}
    </div>
  )
}
