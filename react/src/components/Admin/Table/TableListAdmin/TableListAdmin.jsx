import React from 'react'
import { Button, Icon, Checkbox } from 'semantic-ui-react'
import { map } from 'lodash'
import { TableAdmin } from '../main'
import './TableListAdmin.scss'

export function TableListAdmin(props) {
  const { tables } = props
  return (
    <div className="table-list-admin">
      <Button
        primary
        className="table-list-admin__reload"
        icon
        onClick={() => console.log('onRefetchReload')}
      >
        <Icon name="refresh"></Icon>
      </Button>

      <div className="table-list-admin__reload-toggle">
        <span>Toggle Reload</span>
        <Checkbox toggle onChange={(_, data) => console.log(data.checked)} />
      </div>

      {map(tables, (table) => (
        <TableAdmin key={table.number} table={table} />
      ))}
    </div>
  )
}
