import React, { useCallback, useState } from 'react'
import { useCategory } from '../../../../hooks/main'
import { Form, Image, Button } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './AddEditCategoryForm.scss'

export function AddEditCategoryForm(props) {
  const { onClose, onRefetch, category } = props
  const [previewImage, setPreviewImage] = useState(category?.image || null)
  const { addCategory, updateCategory } = useCategory()

  const formik = useFormik({
    initialValues: initialValues(category),
    validationSchema: Yup.object(category ? updateSchema : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (category) updateCategory(category.id, formValue)
        else await addCategory(formValue)

        onRefetch()
        onClose()
      } catch (error) {
        console.log(error)
      }
    },
  })
  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0]
    await formik.setFieldValue('image', file)
    setPreviewImage(URL.createObjectURL(file))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    multiple: false,
    onDrop,
  })
  return (
    <Form className="add-edit-category-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="category name"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />

      <Button
        type="button"
        fluid
        color={formik.errors.image && 'red'}
        {...getRootProps()}
      >
        {previewImage ? 'update image' : 'upload image'}
      </Button>
      <input {...getInputProps()} />
      <Image src={previewImage} fluid />

      <Button
        type="submit"
        primary
        fluid
        content={category ? 'update' : 'create'}
      />
    </Form>
  )
}

function initialValues(data) {
  return {
    title: data?.title || '',
    image: '',
  }
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string().required(true),
  }
}

function updateSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string(),
  }
}
