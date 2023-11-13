import React, { useState, useEffect } from 'react'
import { getOrdersByTableApi } from '../../../../api/orders'
import IconTable from '../../../../assets/table.svg'
import { ORDER_STATUS } from '../../../../utils/constants'

import { Label, Button, Icon, Checkbox } from 'semantic-ui-react'
import './TableAdmin.scss'

export function TableAdmin(props) {
  const { table } = props

  useEffect(() => {
    ;(async () => {
      const response = await getOrdersByTableApi(table.id, ORDER_STATUS.PENDING)
      console.log(response)
    })()
  }, [])

  return (
    <div className="table-admin">
      <img src={IconTable} />
      <p>Table: {table.number}</p>
    </div>
  )
}
