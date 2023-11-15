import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'
import './SelectTable.scss'
import { useTable } from '../../../hooks/main'

export function SelectTable() {
  const [tableNum, setTableNum] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const { isExistTable } = useTable()
  // form validation
  const onSubmit = async () => {
    setError(null) // clear error
    if (!tableNum) {
      setError('You have to type a table number')
    } else {
      const exist = await isExistTable(tableNum)
      if (exist) {
        navigate(`/client/${tableNum}`)
      } else {
        setError(`The table you're typing doesn't exists`)
      }
    }
  }
  return (
    <div className="select-table">
      <div className="select-table__content">
        <h1>Welcome</h1>
        <h2>Type your table number</h2>

        <Form onSubmit={onSubmit}>
          <Form.Input
            placeholder="Example: 134, 154, 223,"
            type="number"
            onChange={(_, data) => setTableNum(data.value)}
          />
          <Button primary fluid>
            Login
          </Button>
        </Form>
        <p className="select-table__content-error">{error}</p>
      </div>
    </div>
  )
}
