import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Form, Button, Checkbox } from 'semantic-ui-react'
import './AddEditUserForm.scss'
import { useUser } from '../../../../hooks/main'

export function AddEditUserForm() {
  const { addUser } = useUser()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await addUser(formValue)

        console.log('user added')
      } catch (error) {
        throw error
      }
    },
  })
  return (
    <Form className="add-edit-user-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="username"
        placeholder="Blair2023"
        value={formik.values.username}
        error={formik.errors.username}
        onChange={formik.handleChange}
      />
      <Form.Input
        name="email"
        placeholder="blair@mckenna.com"
        value={formik.values.email}
        error={formik.errors.username}
        onChange={formik.handleChange}
      />
      <Form.Input
        name="first_name"
        placeholder="Blair"
        value={formik.values.first_name}
        error={formik.errors.first_name}
        onChange={formik.handleChange}
      />
      <Form.Input
        name="last_name"
        placeholder="McKenna"
        value={formik.values.last_name}
        error={formik.errors.last_name}
        onChange={formik.handleChange}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="*****"
        value={formik.values.password}
        error={formik.errors.password}
        onChange={formik.handleChange}
      />

      <div className="add-edit-user-form__active">
        <Checkbox
          toggle
          checked={formik.values.is_active}
          onChange={(_, data) => {
            formik.setFieldValue('is_active', data.checked)
          }}
        />
        Active User
      </div>

      <div className="add-edit-user-form__staff">
        <Checkbox
          toggle
          checked={formik.values.is_staff}
          onChange={(_, data) => {
            formik.setFieldValue('is_staff', data.checked)
          }}
        />
        Staff User
      </div>

      <Button type="submit" content="create" primary fluid />
    </Form>
  )
}

function initialValues() {
  return {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    is_active: true,
    is_staff: false,
  }
}

function newSchema() {
  return {
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    first_name: Yup.string(),
    last_name: Yup.string(),
    password: Yup.string().required(true),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true),
  }
}
