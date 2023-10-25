import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Form, Button, Checkbox } from 'semantic-ui-react'
import './AddEditUserForm.scss'
import { useUser } from '../../../../hooks/main'

export function AddEditUserForm(props) {
  const { onClose, onRefetch, user } = props
  const { addUser, updateUser } = useUser()

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(user ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (user) await updateUser(user.id, formValue)
        else await addUser(formValue)

        onRefetch()
        onClose()
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

      <Button
        type="submit"
        content={user ? 'update' : 'create'}
        primary
        fluid
      />
    </Form>
  )
}

function initialValues(data) {
  return {
    username: data?.username || '',
    email: data?.email || '',
    first_name: data?.first_name || '',
    last_name: data?.last_name || '',
    password: '',
    is_active: data?.is_active ? true : false,
    is_staff: data?.is_staff ? true : false,
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

function updateSchema() {
  return {
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    first_name: Yup.string(),
    last_name: Yup.string(),
    password: Yup.string(),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true),
  }
}
