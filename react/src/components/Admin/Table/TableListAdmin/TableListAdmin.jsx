import React from 'react'
import { map } from 'lodash'
import { TableAdmin } from '../main'
import './TableListAdmin.scss'

export function TableListAdmin(props) {
  const { tables } = props
  return (
    <div className="table-list-admin">
      {map(tables, (table) => (
        <TableAdmin key={table.number} table={table} />
      ))}
    </div>
  )
}
