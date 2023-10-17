import React from 'react'
import './LoginForm.scss'
import { Button, Form } from 'semantic-ui-react'

export function LoginForm() {
  return (
    <Form className="login-form-admin">
      <Form.Input name="email" placeholder="e-mail" />
      <Form.Input name="password" type="password" placeholder="*****" />
      <Button type="submit" content="start session" primary fluid />
    </Form>
  )
}
