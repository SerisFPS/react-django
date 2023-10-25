import React from 'react'
import { Form, Button, Checkbox } from 'semantic-ui-react'
import './AddEditUserForm.scss'

export function AddEditUserForm() {
  return (
    <Form className="add-edit-user-form">
      <Form.Input name="username" placeholder="Blair2023" />
      <Form.Input name="email" placeholder="blair@mckenna.com" />
      <Form.Input name="first_name" placeholder="Blair" />
      <Form.Input name="last_name" placeholder="McKenna" />
      <Form.Input name="password" type="password" placeholder="*****" />

      <div className="add-edit-user-form__active">
        <Checkbox toggle /> Active User
      </div>

      <div className="add-edit-user-form__staff">
        <Checkbox toggle /> Staff User
      </div>

      <Button type="submit" content="create" primary fluid />
    </Form>
  )
}
