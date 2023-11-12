import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './AddEditTableForm.scss'
import { initial } from 'lodash'

export function AddEditTableForm(props) {
  const { onClose } = props

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validationOnChange: false,
    onSubmit: (formValue) => {
      console.log('form sent')
      console.log(formValue)
    },
  })
  return (
    <Form className="add-edit-table-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="number"
        type="number"
        placeholder="124"
        value={formik.values.number}
        onChange={formik.handleChange}
        error={formik.errors.number}
      />
      <Button type="submit" primary fluid content="create" />
    </Form>
  )
}

function initialValues() {
  return {
    number: '',
  }
}

function validationSchema() {
  return { number: Yup.number().required(true) }
}
