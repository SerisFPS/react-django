import React, { useState, useEffect } from 'react'
import { size } from 'lodash'
import { getOrdersByTableApi } from '../../../../api/orders'
import IconTable from '../../../../assets/TableIcon'
import { ORDER_STATUS } from '../../../../utils/constants'
import { Label, Button, Icon, Checkbox } from 'semantic-ui-react'
import './TableAdmin.scss'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { usePayment } from '../../../../hooks/main'

export function TableAdmin(props) {
  const { table, refetch } = props
  const [orders, setOrders] = useState([])
  const [tableBusy, setTableBusy] = useState(false)
  const [pendingPayment, setPendingPayment] = useState(false)
  const { getPaymentByTable } = usePayment()

  useEffect(() => {
    ;(async () => {
      const response = await getPaymentByTable(table.id)
      // console.log('Table ID -> ', table.id)
      // console.log(response)
      if (size(response) > 0) setPendingPayment(true)
      else setPendingPayment(false)
    })()
  }, [refetch])

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

      {pendingPayment && (
        <Label circular color="orange">
          Pay
        </Label>
      )}
      <IconTable
        className={classNames({
          pending: size(orders) > 0,
          busy: tableBusy,
          'pending-payment': pendingPayment,
        })}
      />
      <p>Table: {table.number}</p>
    </Link>
  )
}
