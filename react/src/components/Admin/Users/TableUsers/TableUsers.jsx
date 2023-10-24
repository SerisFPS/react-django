import React from 'react'
import './TableUsers.scss'
import { Table, Button, Icon } from 'semantic-ui-react'
import { map } from 'lodash'

export function TableUsers(props) {
  const { users } = props

  return (
    <Table className="table-users-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>username</Table.HeaderCell>
          <Table.HeaderCell>email</Table.HeaderCell>
          <Table.HeaderCell>name</Table.HeaderCell>
          <Table.HeaderCell>last name</Table.HeaderCell>
          <Table.HeaderCell>active</Table.HeaderCell>
          <Table.HeaderCell>staff</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(users, (user, index) => (
          <Table.Row key={index}>
            <Table.Cell>{user.username}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.first_name}</Table.Cell>
            <Table.Cell>{user.last_name}</Table.Cell>
            <Table.Cell className="status">
              {user.is_active ? <Icon name="check" /> : <Icon name="close" />}
            </Table.Cell>
            <Table.Cell className="status">
              {user.is_staff ? <Icon name="check" /> : <Icon name="close" />}
            </Table.Cell>

            <Actions user={user} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

function Actions(props) {
  const { user } = props
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => console.log(`edit user -> ${user.username}`)}>
        <Icon name="pencil" />
      </Button>
      <Button
        icon
        negative
        onClick={() => console.log(`delete user -> ${user.username}`)}
      >
        <Icon name="close" />
      </Button>
    </Table.Cell>
  )
}
