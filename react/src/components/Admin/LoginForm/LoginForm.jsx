import React from 'react'
// validation logic
import { useFormik } from 'formik'
import * as Yup from 'yup'
// scss import
import './LoginForm.scss'
// semantic ui imports
import { Button, Form } from 'semantic-ui-react'

export function LoginForm() {
  const formik = useFormik({
    validateOnChange: false,
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formValue) => {
      console.log('Login Sent')
      console.log(formValue)
    },
  })
  return (
    <Form className="login-form-admin" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="e-mail"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
        // error={'asd'}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="*****"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <Button type="submit" content="start session" primary fluid />
    </Form>
  )
}

function initialValues() {
  return {
    email: '',
    password: '',
  }
}

function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  }
}
