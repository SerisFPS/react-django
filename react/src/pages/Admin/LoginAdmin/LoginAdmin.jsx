import React from 'react'
import { LoginForm } from '../../../components/Admin/main'
import './LoginAdmin.scss'

export function LoginAdmin() {
  return (
    <div className="login-admin">
      <div className="login-admin__content">
        <h1>Admin Login</h1>
        <LoginForm />
      </div>
    </div>
  )
}
