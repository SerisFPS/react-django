import React from 'react'
import { Label, Button, Icon, Checkbox } from 'semantic-ui-react'

import './TableAdmin.scss'

export function TableAdmin(props) {
  const { table } = props
  return (
    <div className="table-admin">
      <p>Table: {table.number}</p>
    </div>
  )
}
