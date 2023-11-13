import React from 'react'
import { Form, Image, Button, Dropdown } from 'semantic-ui-react'
import './AddOrderForm.scss'
export function AddOrderForm(props) {
  const { idTable, openCloseModal } = props

  return (
    <Form className="add-order-form">
      <Dropdown placeholder="products" fluid selection search />

      <div className="add-order-form__list">
        {/* For selected products ... */}
      </div>
      <Button primary fluid type="submit" content="add products to table" />
    </Form>
  )
}
