import React, { useState, useEffect } from 'react'
import { Button, Icon, Checkbox } from 'semantic-ui-react'
import { map } from 'lodash'
import { TableAdmin } from '../main'
import './TableListAdmin.scss'

export function TableListAdmin(props) {
  const { tables } = props
  const [refetch, setRefetch] = useState(false)
  const [autoRefetch, setAutoRefetch] = useState(false)

  useEffect(() => {
    // recursive refetch function
    if (autoRefetch) {
      const autoRefetchAction = () => {
        onRefetch()
        setTimeout(() => {
          autoRefetchAction()
        }, 5000)
      }
      autoRefetchAction()
    }
  }, [autoRefetch])

  const onCheckAutoRefetch = (check) => {
    console.log(check)
    if (check) {
      setAutoRefetch(true)
    } else {
      window.location.reload()
    }
  }
  const onRefetch = () => setRefetch((prev) => !prev)

  return (
    <div className="table-list-admin">
      <Button
        primary
        className="table-list-admin__reload"
        icon
        onClick={onRefetch}
      >
        <Icon name="refresh"></Icon>
      </Button>

      <div className="table-list-admin__reload-toggle">
        <span>Toggle Reload</span>
        <Checkbox
          toggle
          checked={autoRefetch}
          onChange={(_, data) => onCheckAutoRefetch(data.checked)}
        />
      </div>

      {map(tables, (table) => (
        <TableAdmin key={table.number} table={table} refetch={refetch} />
      ))}
    </div>
  )
}
