import React from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { useAuth } from '../../../hooks/main'
import './TopMenu.scss'

export function TopMenu() {
  const { auth, logout } = useAuth() // get user data

  console.log(auth.me)
  const renderName = () => {
    if (auth.me?.username) {
      return auth.me.username
    } else if (auth.me?.first_name && auth.me?.last_name) {
      return `${auth.me.first_name}  ${auth.me.last_name}`
    } else {
      return auth.me.email
    }
  }
  console.log(auth)

  return (
    <div>
      <Menu fixed="top" className="top-menu-admin">
        <Menu.Item className="top-menu-admin__logo">
          <p>iCard Admin</p>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>Hello, {renderName()} </Menu.Item>
          <Menu.Item onClick={logout}>
            <Icon name="sign-out" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  )
}
