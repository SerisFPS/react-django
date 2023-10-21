import React from 'react'
// validation imports
import { useFormik } from 'formik'
import * as Yup from 'yup'
// scss import
import './LoginForm.scss'
// semantic ui imports
import { Button, Form } from 'semantic-ui-react'
// auth loginApi import from django
import { loginApi } from '../../../api/user'
// alerts
import { toast } from 'react-toastify'
// custom auth hook
import { useAuth } from '../../../hooks/main'

export function LoginForm() {
  const { login } = useAuth()

  const formik = useFormik({
    validateOnChange: false,
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    // we need an async petition from django login auth
    onSubmit: async (formValue) => {
      try {
        // await is for async
        const response = await loginApi(formValue)
        const { access } = response
        login(access)
      } catch (error) {
        console.log('ERROR')
        toast.error(error.message)
      }
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
