import React, { useState, useEffect } from 'react'
import { size } from 'lodash'
import { getOrdersByTableApi } from '../../../../api/orders'
import IconTable from '../../../../assets/TableIcon'
import { ORDER_STATUS } from '../../../../utils/constants'
import { Label, Button, Icon, Checkbox } from 'semantic-ui-react'
import './TableAdmin.scss'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

export function TableAdmin(props) {
  const { table, refetch } = props
  const [orders, setOrders] = useState([])
  const [tableBusy, setTableBusy] = useState(false)

  useEffect(() => {
    ;(async () => {
      const response = await getOrdersByTableApi(table.id, ORDER_STATUS.PENDING)
      setOrders(response)
    })()
  }, [refetch])

  useEffect(() => {
    ;(async () => {
      const response = await getOrdersByTableApi(
        table.id,
        ORDER_STATUS.DELIVERED
      )

      if (size(response) > 0) setTableBusy(response)
      else setTableBusy(false)
    })()
  }, [refetch])

  return (
    <Link className="table-admin" to={`/admin/table/${table.id}`}>
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
          busy: tableBusy,
        })}
      />
      <p>Table: {table.number}</p>
    </Link>
  )
}
