import React from 'react'
import { Form, Image, Button, Dropdown, Checkbox } from 'semantic-ui-react'
import './AddEditProductsForm.scss'
export function AddEditProductsForm() {
  return (
    <Form className="add-edit-product-form">
      <Form.Input name="title" placeholder="product name" />
      <Form.Input type="number" name="price" placeholder="25" />
      <Dropdown placeholder="product category" fluid selection search />
      <div className="add-edit-product-form__active">
        <Checkbox toggle />
        Active Product
      </div>

      <Button type="button" fluid>
        upload image
      </Button>

      <Button type="submit" primary fluid content="create" />
    </Form>
  )
}
