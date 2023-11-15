import React, { useEffect } from 'react'
import { useTable } from '../../hooks/main'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Container, Button, Icon } from 'semantic-ui-react'
import './ClientLayout.scss'

export function ClientLayout(props) {
  const { isExistTable } = useTable()
  const { tableNumber } = useParams() // taking tableNumber value from url
  const { children } = props
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const exist = await isExistTable(tableNumber)
      if (!exist) closeTable()
    })()
  }, [tableNumber])

  const closeTable = () => {
    navigate('/')
  }

  const goToCart = () => {
    navigate(`/client/${tableNumber}/cart`)
  }

  const goToOrders = () => {
    navigate(`/client/${tableNumber}/orders`)
  }

  return (
    <div className="client-layout-bg">
      <Container className="client-layout">
        <div className="client-layout__header">
          <Link to={`/client/${tableNumber}`}>
            <h1>Home</h1>
          </Link>
          <span>Table {tableNumber}</span>

          <div>
            <Button icon onClick={goToCart}>
              <Icon name="shop" />
            </Button>
            <Button icon onClick={goToOrders}>
              <Icon name="list" />
            </Button>

            <Button icon onClick={closeTable}>
              <Icon name="sign-out" />
            </Button>
          </div>
        </div>
        <div className="client-layout__content">{children}</div>
      </Container>
    </div>
  )
}
