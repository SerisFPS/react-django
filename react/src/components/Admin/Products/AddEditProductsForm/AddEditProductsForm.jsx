import React, { useCallback, useEffect, useState } from 'react'
import {
  Form,
  Image,
  Button,
  Dropdown,
  Checkbox,
  Input,
} from 'semantic-ui-react'
import { map } from 'lodash'
import { useDropzone } from 'react-dropzone'
import './AddEditProductsForm.scss'
import { useCategory, useProducts } from '../../../../hooks/main'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export function AddEditProductsForm(props) {
  const { onClose, onRefetch, product } = props
  const { categories, getCategories } = useCategory()
  const [categoriesFormat, setCategoriesFormat] = useState([])
  const [previewImage, setPreviewImage] = useState(
    product ? product?.image : null
  )
  const { addProduct, updateProduct } = useProducts()

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    setCategoriesFormat(formatDropdownData(categories))
  }, [categories])

  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: Yup.object(product ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (product) {
        await updateProduct(product.id, formValue)
      } else await addProduct(formValue)

      onRefetch()
      onClose()
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
    <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="product name"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <Form.Input
        type="number"
        name="price"
        placeholder="25"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.errors.price}
      />
      <Dropdown
        placeholder="product category"
        fluid
        selection
        search
        options={categoriesFormat}
        value={formik.values.category}
        error={formik.errors.category}
        onChange={(_, data) => formik.setFieldValue('category', data.value)}
      />
      <div className="add-edit-product-form__active">
        <Checkbox
          toggle
          checked={formik.values.active}
          error={formik.errors.active}
          onChange={(_, data) => formik.setFieldValue('active', data.checked)}
        />
        Active Product
      </div>

      <Button
        type="button"
        fluid
        color={formik.errors.image && 'red'}
        {...getRootProps()}
      >
        {previewImage ? 'update image' : 'create image'}
      </Button>
      <input {...getInputProps()} />
      <Image src={previewImage} />

      <Button
        type="submit"
        primary
        fluid
        content={product ? 'update' : 'create'}
      />
    </Form>
  )
}

function formatDropdownData(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
  }))
}

function initialValues(data) {
  return {
    title: data?.title || '',
    price: data?.price || '',
    category: data?.category || '',
    active: data?.active ? true : false,
    Image: '',
  }
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.number().required(true),
    category: Yup.number().required(true),
    active: Yup.boolean().required(true),
    image: Yup.string().required(true),
  }
}

function updateSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.number().required(true),
    category: Yup.number().required(true),
    active: Yup.boolean().required(true),
    image: Yup.string(),
  }
}
