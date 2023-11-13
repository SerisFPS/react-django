import React, { useState, useEffect } from 'react'
import { size } from 'lodash'
import { getOrdersByTableApi } from '../../../../api/orders'
import IconTable from '../../../../assets/TableIcon'
import { ORDER_STATUS } from '../../../../utils/constants'
import { Label, Button, Icon, Checkbox } from 'semantic-ui-react'
import './TableAdmin.scss'
import classNames from 'classnames'

export function TableAdmin(props) {
  const { table } = props
  const [orders, setOrders] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await getOrdersByTableApi(table.id, ORDER_STATUS.PENDING)
      setOrders(response)
    })()
  }, [])

  return (
    <div className="table-admin">
      {/* size orders elements on array */}
      {size(orders) > 0 ? (
        <Label circular color="purple">
          {/* size table orders */}
          {size(orders)}
        </Label>
      ) : null}
      <IconTable
        className={classNames({
          pending: size(orders) > 0,
        })}
      />
      <p>Table: {table.number}</p>
    </div>
  )
}
